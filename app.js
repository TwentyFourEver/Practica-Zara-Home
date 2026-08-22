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

function shuffle(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function sample(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function unique(items) {
  return [...new Set(items)];
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2100);
}

function tableInput(answer, kind, label, table) {
  return `<div class="cell-input-wrap">
    <input class="table-input ${kind}" type="text" inputmode="numeric" autocomplete="off" spellcheck="false"
      data-answer="${answer}" data-kind="${kind}" data-table="${table}" aria-label="${label}" />
    <span class="cell-mark" aria-hidden="true"></span>
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

function validateTableInput(input) {
  const value = input.value.trim();
  input.classList.remove("correct", "wrong");
  input.removeAttribute("aria-invalid");
  if (!value) {
    updateFillProgress(input.dataset.table);
    return null;
  }

  const normalize = input.dataset.kind === "measure" ? normalizeMeasure : normalizeCode;
  const isCorrect = normalize(value) === normalize(input.dataset.answer);
  input.classList.add(isCorrect ? "correct" : "wrong");
  if (!isCorrect) input.setAttribute("aria-invalid", "true");
  updateFillProgress(input.dataset.table);
  return isCorrect;
}

function updateFillProgress(table) {
  const inputs = $$(`.table-input[data-table="${table}"]`);
  const correct = inputs.filter((input) => input.classList.contains("correct")).length;
  const target = table === "bedding" ? "#beddingProgress" : "#cushionProgress";
  $(target).textContent = `${correct} / ${inputs.length}`;
}

function checkFilledTable(table) {
  const inputs = $$(`.table-input[data-table="${table}"]`);
  const filled = inputs.filter((input) => input.value.trim());
  if (!filled.length) {
    showToast("La tabla está vacía. Escribe alguna respuesta primero.");
    inputs[0].focus();
    return;
  }

  const results = filled.map(validateTableInput);
  const wrong = results.filter((result) => result === false).length;
  const correct = inputs.filter((input) => input.classList.contains("correct")).length;
  if (correct === inputs.length) {
    showToast("¡Tabla completa! Todas las respuestas son correctas.");
  } else if (wrong) {
    showToast(`${wrong} ${wrong === 1 ? "casilla necesita" : "casillas necesitan"} otro intento.`);
  } else {
    showToast(`Muy bien. Te faltan ${inputs.length - correct} casillas por completar.`);
  }
}

function clearFillTable(table) {
  const inputs = $$(`.table-input[data-table="${table}"]`);
  if (!inputs.some((input) => input.value)) {
    showToast("Esta tabla ya está vacía.");
    return;
  }
  if (!window.confirm("¿Quieres borrar todas las respuestas de esta tabla?")) return;
  inputs.forEach((input) => {
    input.value = "";
    input.classList.remove("correct", "wrong");
    input.removeAttribute("aria-invalid");
  });
  updateFillProgress(table);
  showToast("Tabla limpia. Puedes comenzar de nuevo.");
}

function setupFillTables() {
  renderFillTables();
  $$(".table-input").forEach((input) => {
    input.addEventListener("change", () => validateTableInput(input));
    input.addEventListener("input", () => {
      input.classList.remove("correct", "wrong");
      input.removeAttribute("aria-invalid");
      updateFillProgress(input.dataset.table);
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        validateTableInput(input);
        const inputs = $$(".table-input");
        inputs[inputs.indexOf(input) + 1]?.focus();
      }
    });
  });
  $$("[data-check-table]").forEach((button) => button.addEventListener("click", () => checkFilledTable(button.dataset.checkTable)));
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
  const pool = [];
  Object.values(beddingData).forEach((row) => {
    products.forEach((item) => pool.push(row[item.id][askMeasure ? 0 : 1]));
  });
  const distractors = shuffle(unique(pool).filter((value) => value !== answer)).slice(0, 3);
  return {
    category: "ROPA DE CAMA",
    question: `Para <strong>${size}</strong>, ¿cuál es ${askMeasure ? "la <strong>medida</strong>" : "la <strong>talla</strong>"} de ${product.name.toLowerCase()}?`,
    answer,
    options: shuffle([answer, ...distractors]),
    explanation: `${product.name} · ${size}: ${beddingData[size][product.id][0]} cm, talla ${beddingData[size][product.id][1]}.`
  };
}

function makeCushionQuestion() {
  const item = sample(cushionData);
  const askMeasure = Math.random() < 0.68;
  const answer = askMeasure ? item.measure : item.size;
  const source = cushionData.map((entry) => askMeasure ? entry.measure : entry.size);
  return {
    category: "COJINES",
    question: askMeasure
      ? `Para la <strong>talla ${item.size}</strong>, ¿cuál es la <strong>medida</strong> correcta?`
      : `¿Qué <strong>talla</strong> corresponde a la <strong>medida ${item.measure}</strong>?`,
    answer,
    options: shuffle([answer, ...shuffle(source.filter((value) => value !== answer)).slice(0, 3)]),
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
  $("#optionsList").innerHTML = currentQuestion.options
    .map((option, index) => `
      <button class="option-button" type="button" data-answer="${option}">
        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
        <span class="option-value">${option}${currentQuestion.category === "COJINES" || option.includes("×") ? "" : ""}</span>
      </button>`)
    .join("");
  $("#answerNote").className = "answer-note hidden";
  $("#answerNote").textContent = "";
  $("#nextQuestionButton").classList.add("hidden");
  updateStats();
  const card = $("#questionCard");
  card.classList.remove("swap");
  void card.offsetWidth;
  card.classList.add("swap");
}

function answerQuestion(event) {
  const button = event.target.closest(".option-button");
  if (!button || quizLocked) return;
  quizLocked = true;
  const isCorrect = button.dataset.answer === currentQuestion.answer;
  $$(".option-button").forEach((option) => {
    option.disabled = true;
    if (option.dataset.answer === currentQuestion.answer) option.classList.add("correct");
  });
  if (!isCorrect) button.classList.add("wrong");

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
    input.classList.remove("correct", "wrong");
    input.removeAttribute("aria-invalid");
  });
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
$("#optionsList").addEventListener("click", answerQuestion);
$("#nextQuestionButton").addEventListener("click", createQuestion);
$("#resetButton").addEventListener("click", resetProgress);
updateStats();
