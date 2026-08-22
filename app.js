const beddingData = {
  "Cuna": {
    fitted: ["60 × 120", "10"], top: ["100 × 150", "10"], duvet: ["100 × 120", "10"],
    pillow: ["30 × 50", "20"], quilt: ["100 × 120", "10"], comforter: ["100 × 120", "40"]
  },
  "Individual Twin": {
    fitted: ["90 × 200", "12"], top: ["160 × 280", "12"], duvet: ["150 × 220", "12"],
    pillow: ["50 × 75", "28"], quilt: ["180 × 250", "20"], comforter: ["180 × 250", "45"]
  },
  "Matrimonial Full": {
    fitted: ["140 × 200", "21"], top: ["210 × 280", "14"], duvet: ["220 × 220", "14"],
    pillow: ["50 × 75", "28"], quilt: ["230 × 250", "19"], comforter: ["230 × 250", "46"]
  },
  "Queen Grande": {
    fitted: ["160 × 200", "17"], top: ["240 × 280", "16"], duvet: ["240 × 220", "16"],
    pillow: ["50 × 75", "28"], quilt: ["230 × 250", "19"], comforter: ["230 × 250", "46"]
  },
  "King California": {
    fitted: ["200 × 200", "19"], top: ["270 × 280", "18"], duvet: ["260 × 240", "24"],
    pillow: ["50 × 95", "27"], quilt: ["270 × 280", "24"], comforter: ["270 × 280", "63"]
  },
  "King California Alta": {
    fitted: ["200 × 200", "19"], top: ["290 × 280", "19"], duvet: ["290 × 260", "19"],
    pillow: ["50 × 95", "27"], quilt: ["270 × 280", "24"], comforter: ["270 × 280", "63"]
  }
};

const cushionData = [
  { size: "60", measure: "30 × 40" },
  { size: "61", measure: "30 × 50" },
  { size: "62", measure: "40 × 40" },
  { size: "63", measure: "50 × 50" },
  { size: "64", measure: "45 × 45" },
  { size: "66", measure: "60 × 60" }
];

const products = [
  { id: "fitted", name: "Bajera con elástico", short: "Bajera", icon: "⌒" },
  { id: "top", name: "Sábana encimera", short: "Encimera", icon: "≋" },
  { id: "duvet", name: "Duvet", short: "Duvet", icon: "◇" },
  { id: "pillow", name: "Fundas de almohada", short: "Fundas", icon: "▭" },
  { id: "quilt", name: "Colcha", short: "Colcha", icon: "⌗" },
  { id: "comforter", name: "Edredón", short: "Edredón", icon: "▦" }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

let currentQuestion = null;
let quizLocked = false;
let quizState = loadQuizState();
let toastTimer;
let audioContext;

function playQuizSound(isCorrect) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  try {
    audioContext ??= new AudioContext();
    if (audioContext.state === "suspended") audioContext.resume();

    const start = audioContext.currentTime;
    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.0001, start);
    masterGain.gain.exponentialRampToValueAtTime(0.16, start + 0.015);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, start + (isCorrect ? 0.52 : 0.42));
    masterGain.connect(audioContext.destination);

    const notes = isCorrect
      ? [{ frequency: 523.25, delay: 0 }, { frequency: 659.25, delay: 0.12 }, { frequency: 783.99, delay: 0.24 }]
      : [{ frequency: 220, delay: 0 }, { frequency: 164.81, delay: 0.16 }];

    notes.forEach(({ frequency, delay }) => {
      const oscillator = audioContext.createOscillator();
      const noteGain = audioContext.createGain();
      const noteStart = start + delay;
      const noteEnd = noteStart + (isCorrect ? 0.2 : 0.24);

      oscillator.type = isCorrect ? "sine" : "triangle";
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      if (!isCorrect) oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.84, noteEnd);
      noteGain.gain.setValueAtTime(0.0001, noteStart);
      noteGain.gain.exponentialRampToValueAtTime(1, noteStart + 0.01);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);
      oscillator.connect(noteGain);
      noteGain.connect(masterGain);
      oscillator.start(noteStart);
      oscillator.stop(noteEnd);
    });
  } catch {
    // El quiz sigue funcionando si el navegador o el dispositivo bloquea el audio.
  }
}

function loadQuizState() {
  try {
    const stored = JSON.parse(localStorage.getItem("casaQuizState"));
    return {
      correct: Number(stored?.correct) || 0,
      wrong: Number(stored?.wrong) || 0,
      streak: Number(stored?.streak) || 0,
      answered: Number(stored?.answered) || 0
    };
  } catch {
    return { correct: 0, wrong: 0, streak: 0, answered: 0 };
  }
}

function saveQuizState() {
  localStorage.setItem("casaQuizState", JSON.stringify(quizState));
}

function normalizeMeasure(value) {
  return value
    .toLowerCase()
    .replace(/[×✕*]/g, "x")
    .replace(/cm/g, "")
    .replace(/\s/g, "")
    .trim();
}

function normalizeCode(value) {
  return value.replace(/\s/g, "").trim();
}

function sample(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2100);
}

function tableInput(answer, kind, label, table) {
  const controlAttributes = `data-answer="${answer}" data-kind="${kind}" data-table="${table}"`;
  if (kind === "measure") {
    return `<div class="cell-input-wrap answer-control measure-pair" ${controlAttributes} role="group" aria-label="${label}">
      <input class="table-input measure-part" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3"
        autocomplete="off" spellcheck="false" data-part="0" aria-label="${label}, primer número" />
      <span class="measure-separator" aria-hidden="true">×</span>
      <input class="table-input measure-part" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3"
        autocomplete="off" spellcheck="false" data-part="1" aria-label="${label}, segundo número" />
    </div>`;
  }

  return `<div class="cell-input-wrap answer-control" ${controlAttributes}>
    <input class="table-input code" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3"
      autocomplete="off" spellcheck="false" aria-label="${label}" />
  </div>`;
}

function renderFillTables() {
  $("#beddingProductHeaders").insertAdjacentHTML("beforeend", products
    .map((product) => `<th class="product-heading ${product.id}" colspan="2">${product.name}</th>`)
    .join(""));

  $("#beddingFieldHeaders").innerHTML = products
    .map((product) => `<th class="sub-heading ${product.id}">MEDIDA</th><th class="sub-heading code-heading ${product.id}">TALLA</th>`)
    .join("");

  $("#beddingTableBody").innerHTML = Object.entries(beddingData)
    .map(([size, row]) => `<tr>
      <th scope="row" class="row-heading">${size}</th>
      ${products.map((product) => {
        const [measure, code] = row[product.id];
        return `<td>${tableInput(measure, "measure", `${size}, ${product.name}, medida`, "bedding")}</td>
          <td class="code-cell">${tableInput(code, "code", `${size}, ${product.name}, talla`, "bedding")}</td>`;
      }).join("")}
    </tr>`)
    .join("");

  $("#cushionTableBody").innerHTML = cushionData
    .map((item, index) => `<tr>
      <td>${tableInput(item.size, "code", `Fila ${index + 1}, talla`, "cushions")}</td>
      <td>${tableInput(item.measure, "measure", `Fila ${index + 1}, medida`, "cushions")}</td>
    </tr>`)
    .join("");
}

function controlInputs(control) {
  return control ? [...control.querySelectorAll(".table-input")] : [];
}

function controlIsBlank(control) {
  return controlInputs(control).every((input) => !input.value.trim());
}

function controlIsComplete(control) {
  return controlInputs(control).every((input) => input.value.trim());
}

function controlValue(control) {
  const values = controlInputs(control).map((input) => input.value.trim());
  return control.dataset.kind === "measure" ? values.join("x") : values[0];
}

function validateTableControl(control, force = false) {
  control.classList.remove("correct", "wrong");
  controlInputs(control).forEach((input) => input.removeAttribute("aria-invalid"));
  if (controlIsBlank(control)) {
    updateFillProgress(control.dataset.table);
    return null;
  }

  if (!controlIsComplete(control) && !force) {
    updateFillProgress(control.dataset.table);
    return null;
  }

  const normalize = control.dataset.kind === "measure" ? normalizeMeasure : normalizeCode;
  const isCorrect = controlIsComplete(control) && normalize(controlValue(control)) === normalize(control.dataset.answer);
  control.classList.add(isCorrect ? "correct" : "wrong");
  if (!isCorrect) controlInputs(control).forEach((input) => input.setAttribute("aria-invalid", "true"));
  updateFillProgress(control.dataset.table);
  return isCorrect;
}

function updateFillProgress(table) {
  const controls = $$(`.answer-control[data-table="${table}"]`);
  const correct = controls.filter((control) => control.classList.contains("correct")).length;
  const target = table === "bedding" ? "#beddingProgress" : "#cushionProgress";
  $(target).textContent = `${correct} / ${controls.length}`;
}

function checkFilledTable(table) {
  const controls = $$(`.answer-control[data-table="${table}"]`);
  const filled = controls.filter((control) => !controlIsBlank(control));
  if (!filled.length) {
    showToast("La tabla está vacía. Escribe alguna respuesta primero.");
    controlInputs(controls[0])[0].focus();
    return;
  }

  const results = filled.map((control) => validateTableControl(control, true));
  const wrong = results.filter((result) => result === false).length;
  const correct = controls.filter((control) => control.classList.contains("correct")).length;
  if (correct === controls.length) {
    showToast("¡Tabla completa! Todas las respuestas son correctas.");
  } else if (wrong) {
    showToast(`${wrong} ${wrong === 1 ? "casilla necesita" : "casillas necesitan"} otro intento.`);
  } else {
    showToast(`Muy bien. Te faltan ${controls.length - correct} casillas por completar.`);
  }
}

function clearFillTable(table) {
  const controls = $$(`.answer-control[data-table="${table}"]`);
  const inputs = controls.flatMap(controlInputs);
  if (!inputs.some((input) => input.value)) {
    showToast("Esta tabla ya está vacía.");
    return;
  }
  if (!window.confirm("¿Quieres borrar todas las respuestas de esta tabla?")) return;
  inputs.forEach((input) => {
    input.value = "";
    input.removeAttribute("aria-invalid");
  });
  controls.forEach((control) => control.classList.remove("correct", "wrong"));
  updateFillProgress(table);
  showToast("Tabla limpia. Puedes comenzar de nuevo.");
}

function completeFillTable(table) {
  const controls = $$(`.answer-control[data-table="${table}"]`);
  controls.forEach((control) => {
    const inputs = controlInputs(control);
    if (control.dataset.kind === "measure") {
      const [first, second] = control.dataset.answer.split("×").map((value) => value.trim());
      inputs[0].value = first;
      inputs[1].value = second;
    } else {
      inputs[0].value = control.dataset.answer;
    }
    validateTableControl(control, true);
  });
  showToast("Tabla completada. Ya puedes consultar todas las respuestas.");
}

function setupFillTables() {
  renderFillTables();
  $$(".table-input").forEach((input) => {
    const control = input.closest(".answer-control");
    input.addEventListener("change", () => validateTableControl(control));
    input.addEventListener("input", () => {
      const numericValue = input.value.replace(/\D/g, "");
      if (input.value !== numericValue) input.value = numericValue;
      control.classList.remove("correct", "wrong");
      controlInputs(control).forEach((field) => field.removeAttribute("aria-invalid"));
      updateFillProgress(control.dataset.table);
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const fields = controlInputs(control);
        if (control.dataset.kind === "measure" && input === fields[0]) {
          fields[1].focus();
          return;
        }
        validateTableControl(control, true);
        const controls = $$(".answer-control");
        controlInputs(controls[controls.indexOf(control) + 1])[0]?.focus();
      }
    });
  });
  $$("[data-check-table]").forEach((button) => button.addEventListener("click", () => checkFilledTable(button.dataset.checkTable)));
  $$("[data-complete-table]").forEach((button) => button.addEventListener("click", () => completeFillTable(button.dataset.completeTable)));
  $$("[data-clear-table]").forEach((button) => button.addEventListener("click", () => clearFillTable(button.dataset.clearTable)));
}

function setupModeSwitch() {
  $$(".mode-pill").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".mode-pill").forEach((pill) => pill.classList.toggle("active", pill === button));
      const beddingActive = button.dataset.dataset === "bedding";
      $("#beddingPractice").classList.toggle("hidden", !beddingActive);
      $("#cushionPractice").classList.toggle("hidden", beddingActive);
    });
  });
}

function setupNavigation() {
  $$(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.view;
      $$(".nav-item").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.toggleAttribute("aria-current", item === button);
      });
      $$(".view").forEach((view) => view.classList.toggle("active", view.id === target));
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (target === "quizView" && !currentQuestion) createQuestion();
    });
  });
}

function makeBeddingQuestion() {
  const size = sample(Object.keys(beddingData));
  const product = sample(products);
  const askMeasure = Math.random() < 0.62;
  const answer = beddingData[size][product.id][askMeasure ? 0 : 1];
  return {
    category: "ROPA DE CAMA",
    question: `Para <strong>${size}</strong>, ¿cuál es ${askMeasure ? "la <strong>medida</strong>" : "la <strong>talla</strong>"} de ${product.name.toLowerCase()}?`,
    answer,
    answerKind: askMeasure ? "measure" : "code",
    explanation: `${product.name} · ${size}: ${beddingData[size][product.id][0]} cm, talla ${beddingData[size][product.id][1]}.`
  };
}

function makeCushionQuestion() {
  const item = sample(cushionData);
  const askMeasure = Math.random() < 0.68;
  const answer = askMeasure ? item.measure : item.size;
  return {
    category: "COJINES",
    question: askMeasure
      ? `Para la <strong>talla ${item.size}</strong>, ¿cuál es la <strong>medida</strong> correcta?`
      : `¿Qué <strong>talla</strong> corresponde a la <strong>medida ${item.measure}</strong>?`,
    answer,
    answerKind: askMeasure ? "measure" : "code",
    explanation: `La talla ${item.size} corresponde a ${item.measure} cm.`
  };
}

function createQuestion() {
  quizLocked = false;
  currentQuestion = Math.random() < 0.78 ? makeBeddingQuestion() : makeCushionQuestion();
  const visibleNumber = quizState.answered + 1;
  $("#questionCategory").textContent = currentQuestion.category;
  $("#questionNumber").textContent = String(((visibleNumber - 1) % 99) + 1).padStart(2, "0");
  $("#questionText").innerHTML = currentQuestion.question;
  $("#quizAnswerFields").innerHTML = currentQuestion.answerKind === "measure"
    ? `<label class="quiz-answer-label">ESCRIBE LA MEDIDA <span>CM</span></label>
      <div class="quiz-input-pair" role="group" aria-label="Escribe la medida">
        <input class="quiz-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" autocomplete="off" aria-label="Primer número de la medida" />
        <span aria-hidden="true">×</span>
        <input class="quiz-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" autocomplete="off" aria-label="Segundo número de la medida" />
      </div>`
    : `<label class="quiz-answer-label" for="quizCodeInput">ESCRIBE LA TALLA</label>
      <input class="quiz-input quiz-code-input" id="quizCodeInput" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" autocomplete="off" aria-label="Escribe la talla" />`;
  $$("#quizAnswerFields .quiz-input").forEach((input) => input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
    $("#quizAnswerFields").classList.remove("correct", "wrong");
  }));
  $("#quizAnswerForm").classList.remove("hidden");
  $(".quiz-check-button").classList.remove("hidden");
  $("#answerNote").className = "answer-note hidden";
  $("#answerNote").textContent = "";
  $("#nextQuestionButton").classList.add("hidden");
  updateStats();
  const card = $("#questionCard");
  card.classList.remove("swap");
  void card.offsetWidth;
  card.classList.add("swap");
}

function submitQuizAnswer(event) {
  event.preventDefault();
  if (quizLocked) return;
  const inputs = $$("#quizAnswerFields .quiz-input");
  if (inputs.some((input) => !input.value.trim())) {
    showToast("Escribe la respuesta completa antes de comprobar.");
    inputs.find((input) => !input.value.trim())?.focus();
    return;
  }

  const response = currentQuestion.answerKind === "measure"
    ? inputs.map((input) => input.value.trim()).join("x")
    : inputs[0].value.trim();
  const normalize = currentQuestion.answerKind === "measure" ? normalizeMeasure : normalizeCode;
  quizLocked = true;
  const isCorrect = normalize(response) === normalize(currentQuestion.answer);
  playQuizSound(isCorrect);
  $("#quizAnswerFields").classList.add(isCorrect ? "correct" : "wrong");
  inputs.forEach((input) => {
    input.disabled = true;
    if (!isCorrect) input.setAttribute("aria-invalid", "true");
  });
  $(".quiz-check-button").classList.add("hidden");

  quizState.answered += 1;
  if (isCorrect) {
    quizState.correct += 1;
    quizState.streak += 1;
  } else {
    quizState.wrong += 1;
    quizState.streak = 0;
  }
  saveQuizState();
  updateStats(true);

  const note = $("#answerNote");
  note.textContent = `${isCorrect ? "¡Correcto!" : "La respuesta correcta está marcada."} ${currentQuestion.explanation}`;
  note.classList.toggle("wrong", !isCorrect);
  note.classList.remove("hidden");
  $("#nextQuestionButton").classList.remove("hidden");
}

function updateStats(animate = false) {
  $("#correctStat").textContent = quizState.correct;
  $("#wrongStat").textContent = quizState.wrong;
  $("#streakStat").textContent = quizState.streak;
  if (animate) {
    const grid = $(".stats-grid");
    grid.classList.remove("bump");
    void grid.offsetWidth;
    grid.classList.add("bump");
  }
}

function resetProgress() {
  const tableInputs = $$(".table-input");
  const tableControls = $$(".answer-control");
  const hasTableAnswers = tableInputs.some((input) => input.value.trim());
  const hasProgress = quizState.correct || quizState.wrong || quizState.streak || hasTableAnswers;
  if (!hasProgress) {
    showToast("Todo está limpio. Ya puedes comenzar.");
    return;
  }
  const confirmed = window.confirm("¿Quieres borrar las tablas y reiniciar aciertos, errores y racha?");
  if (!confirmed) return;

  tableInputs.forEach((input) => {
    input.value = "";
    input.removeAttribute("aria-invalid");
  });
  tableControls.forEach((control) => control.classList.remove("correct", "wrong"));
  updateFillProgress("bedding");
  updateFillProgress("cushions");
  quizState = { correct: 0, wrong: 0, streak: 0, answered: 0 };
  saveQuizState();
  updateStats();
  if (currentQuestion) createQuestion();
  showToast("Práctica reiniciada. Empecemos de nuevo.");
}

setupFillTables();
setupModeSwitch();
setupNavigation();
$("#quizAnswerForm").addEventListener("submit", submitQuizAnswer);
$("#nextQuestionButton").addEventListener("click", createQuestion);
$("#resetButton").addEventListener("click", resetProgress);
updateStats();
