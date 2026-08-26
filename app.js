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

const storeQuestions = [
  {
    question: "¿Dónde se encuentra propiamente el <strong>RFID</strong>?",
    answer: "En la alarma",
    choices: ["En la alarma", "En el precio", "En la bolsa"],
    explanation: "El RFID se encuentra en la alarma y permite llevar un inventario más exacto."
  },
  {
    question: "¿Qué herramienta indica cuánto está generando cada <strong>zona</strong>?",
    answer: "Money mapping",
    choices: ["Money mapping", "Stock", "Merchan"],
    explanation: "Money mapping muestra cuánto está generando cada zona."
  },
  {
    question: "¿Para qué se utiliza <strong>.25</strong>?",
    answer: "Reponer producto a tienda",
    choices: ["Reponer producto a tienda", "Cambiar precios", "Registrar taras"],
    explanation: ".25 se usa para reponer producto a tienda."
  },
  {
    question: "En MO/CA/CO/TA, ¿qué significa <strong>CA</strong>?",
    answer: "Calidad",
    choices: ["Calidad", "Cantidad", "Categoría"],
    explanation: "MO/CA/CO/TA significa Modelo / Calidad / Color / Talla."
  },
  {
    question: "¿Qué son las <strong>taras</strong>?",
    answer: "Productos dañados",
    choices: ["Productos dañados", "Productos agotados", "Productos de exposición"],
    explanation: "Las taras son productos que se encuentran dañados."
  },
  {
    question: "¿Cuál es un mínimo de <strong>atención al cliente</strong>?",
    answer: "Ofrecer alternativas",
    choices: ["Ofrecer alternativas", "Evitar explicar políticas", "Embolsar todo igual"],
    explanation: "Entre los mínimos están mirada amable, saludo, venta mano a mano, embolsar según producto, indicar políticas y ofrecer alternativas."
  },
  {
    question: "¿Qué gramaje tiene la fibra de <strong>verano</strong>?",
    answer: "125 g/m²",
    choices: ["125 g/m²", "170 g/m²", "350 g/m²"],
    explanation: "El relleno nórdico de microfibra de verano pesa 125 g/m² y ofrece calor bajo."
  },
  {
    question: "¿Qué valor TOG tiene el nórdico de <strong>microfibra de 350 g/m²</strong>?",
    answer: "9.5",
    choices: ["9.5", "3.5", "12.5"],
    explanation: "La microfibra de 350 g/m² tiene TOG 9.5."
  },
  {
    question: "¿Qué significa un valor <strong>TOG más alto</strong>?",
    answer: "Un nórdico más caliente",
    choices: ["Un nórdico más caliente", "Un nórdico más ligero", "Una talla más grande"],
    explanation: "Cuanto más elevado es el TOG, mayor es la capacidad térmica y más caliente es el nórdico."
  },
  {
    question: "¿Cuál es la composición del relleno de <strong>plumón</strong>?",
    answer: "90% plumón y 10% plumita",
    choices: ["90% plumón y 10% plumita", "90% pluma y 10% plumón", "100% fibra"],
    explanation: "El plumón lleva 90% plumón de pato y 10% plumita; pesa 170 g/m²."
  },
  {
    question: "El <strong>tacto pluma</strong> parece pluma, pero ¿de qué está hecho?",
    answer: "Fibra o material sintético",
    choices: ["Fibra o material sintético", "Algodón", "Plumón de pato"],
    explanation: "Tacto pluma simula la pluma, pero está hecho de fibra o material sintético."
  },
  {
    question: "¿Qué zonas corresponden a <strong>Dormitorio</strong>?",
    answer: "Zonas 5 y 6",
    choices: ["Zonas 5 y 6", "Zonas 3 y 4", "Zonas 1 y 2"],
    explanation: "En el croquis, Dormitorio ocupa las zonas 5 y 6."
  },
  {
    question: "¿Qué sección está en la <strong>Zona 7</strong>?",
    answer: "Expo caja",
    choices: ["Expo caja", "Baño", "Cocina"],
    explanation: "La Zona 7 corresponde a Expo caja, con la caja en el centro."
  },
  {
    question: "¿Cuántas partes se estudian en la <strong>etiqueta externa</strong>?",
    answer: "6",
    choices: ["6", "4", "8"],
    explanation: "Son seis: ambiente, RFID, referencia, medidas, descripción y precio."
  },
  {
    question: "¿Qué código de calidad identifica la <strong>funda nórdica</strong>?",
    answer: "088",
    choices: ["088", "089", "093"],
    explanation: "La funda nórdica utiliza la calidad 088."
  },
  {
    question: "¿Qué código de calidad identifica la <strong>sábana encimera</strong>?",
    answer: "089",
    choices: ["089", "090", "091/092"],
    explanation: "La sábana encimera utiliza la calidad 089."
  },
  {
    question: "¿Qué código de calidad identifica la <strong>sábana bajera</strong>?",
    answer: "090",
    choices: ["090", "088", "093"],
    explanation: "La sábana bajera utiliza la calidad 090."
  },
  {
    question: "En los parámetros de color, ¿qué representa el código <strong>400</strong>?",
    answer: "Azul",
    choices: ["Azul", "Verde", "Marrón"],
    explanation: "La escalera de color usa 300 amarillo, 400 azul y 500 verde."
  },
  {
    question: "En los parámetros de color, ¿qué representa el código <strong>999</strong>?",
    answer: "Multicolor",
    choices: ["Multicolor", "Negro y gris", "Blanco"],
    explanation: "El código 999 corresponde a multicolor."
  }
];

const mapZones = [
  { id: "1", name: "Cocina" },
  { id: "2", name: "Salón" },
  { id: "3", name: "Baño" },
  { id: "4", name: "Kids" },
  { id: "5", name: "Dormitorio" },
  { id: "6", name: "Dormitorio" },
  { id: "7", name: "Expo caja" }
];

const mapWalls = Array.from({ length: 22 }, (_, index) => ({
  id: String(index + 1),
  name: `Pared ${index + 1}`
}));

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

let currentQuestion = null;
let quizLocked = false;
let quizMode = "measurements";
let quizState = loadQuizState();
let quizHistory = loadQuizHistory();
let mapMastery = loadMapMastery();
let toastTimer;
let audioContext;
let errorAudio;
let successPlayer;
let successPlayerReady = false;

window.onYouTubeIframeAPIReady = () => {
  if (!window.YT?.Player) return;

  successPlayer = new window.YT.Player("successSoundPlayer", {
    width: "1",
    height: "1",
    videoId: "GYefSfSrqyI",
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      playsinline: 1,
      rel: 0
    },
    events: {
      onReady: () => {
        successPlayerReady = true;
        successPlayer.setVolume(72);
      },
      onError: () => {
        successPlayerReady = false;
      }
    }
  });
};

function playYouTubeSuccessSound() {
  if (!successPlayerReady || !successPlayer) return false;

  try {
    successPlayer.seekTo(0, true);
    successPlayer.playVideo();
    return true;
  } catch {
    return false;
  }
}

function playQuizSound(isCorrect) {
  if (!isCorrect) {
    try {
      errorAudio ??= new Audio("assets/audio/quiz-error.mp3");
      errorAudio.volume = 0.72;
      errorAudio.currentTime = 0;
      errorAudio.play().catch(() => {});
    } catch {
      // El quiz sigue funcionando si el navegador bloquea el audio.
    }
    return;
  }

  if (playYouTubeSuccessSound()) return;

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

    const notes = [
      { frequency: 523.25, delay: 0 },
      { frequency: 659.25, delay: 0.12 },
      { frequency: 783.99, delay: 0.24 }
    ];

    notes.forEach(({ frequency, delay }) => {
      const oscillator = audioContext.createOscillator();
      const noteGain = audioContext.createGain();
      const noteStart = start + delay;
      const noteEnd = noteStart + 0.2;

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, noteStart);
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
  const emptyStats = () => ({ correct: 0, wrong: 0, streak: 0, answered: 0 });
  try {
    const stored = JSON.parse(localStorage.getItem("casaQuizState"));
    if (stored?.measurements || stored?.store || stored?.map) {
      return {
        measurements: { ...emptyStats(), ...stored.measurements },
        store: { ...emptyStats(), ...stored.store },
        map: { ...emptyStats(), ...stored.map }
      };
    }
    return {
      measurements: {
        correct: Number(stored?.correct) || 0,
        wrong: Number(stored?.wrong) || 0,
        streak: Number(stored?.streak) || 0,
        answered: Number(stored?.answered) || 0
      },
      store: emptyStats(),
      map: emptyStats()
    };
  } catch {
    return { measurements: emptyStats(), store: emptyStats(), map: emptyStats() };
  }
}

function saveQuizState() {
  localStorage.setItem("casaQuizState", JSON.stringify(quizState));
}

function activeQuizStats() {
  return quizState[quizMode];
}

function loadQuizHistory() {
  const emptyHistory = () => ({ used: [], last: null });
  try {
    const stored = JSON.parse(localStorage.getItem("casaQuizHistory"));
    return {
      measurements: {
        used: Array.isArray(stored?.measurements?.used) ? stored.measurements.used : [],
        last: stored?.measurements?.last || null
      },
      store: {
        used: Array.isArray(stored?.store?.used) ? stored.store.used : [],
        last: stored?.store?.last || null
      },
      map: {
        used: Array.isArray(stored?.map?.used) ? stored.map.used : [],
        last: stored?.map?.last || null
      }
    };
  } catch {
    return { measurements: emptyHistory(), store: emptyHistory(), map: emptyHistory() };
  }
}

function saveQuizHistory() {
  localStorage.setItem("casaQuizHistory", JSON.stringify(quizHistory));
}

function loadMapMastery() {
  try {
    const stored = JSON.parse(localStorage.getItem("casaMapMastery"));
    return Array.isArray(stored) ? stored.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function saveMapMastery() {
  localStorage.setItem("casaMapMastery", JSON.stringify(mapMastery));
}

function takeUnseenQuestion(mode, bank) {
  const history = quizHistory[mode];
  const validIds = new Set(bank.map((item) => item.id));
  history.used = history.used.filter((id) => validIds.has(id));

  let available = bank.filter((item) => !history.used.includes(item.id));
  if (!available.length) {
    history.used = [];
    available = bank.filter((item) => item.id !== history.last);
    if (!available.length) available = bank;
  }

  const selected = sample(available);
  history.used.push(selected.id);
  history.last = selected.id;
  saveQuizHistory();
  return selected.create();
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

function shuffled(items) {
  return [...items].sort(() => Math.random() - 0.5);
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

function updateLearningAreaButtons(target) {
  $$(".learning-area-button").forEach((button) => {
    const isActive = button.dataset.learnDestination === target;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setupLearningAreaSwitch() {
  $$(".learning-area-button").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.learnDestination;
      $$(".view").forEach((view) => view.classList.toggle("active", view.id === target));
      updateLearningAreaButtons(target);
      $$(".nav-item").forEach((item) => {
        const isLearn = item.dataset.view === "learnView";
        item.classList.toggle("active", isLearn);
        item.toggleAttribute("aria-current", isLearn);
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
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
      if (target === "learnView") updateLearningAreaButtons("learnView");
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (target === "quizView" && !currentQuestion) createQuestion();
    });
  });
}

function setupQuizModeSwitch() {
  $$(".quiz-mode-button").forEach((button) => {
    button.addEventListener("click", () => {
      quizMode = button.dataset.quizMode;
      $$(".quiz-mode-button").forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      currentQuestion = null;
      updateStats();
      createQuestion();
    });
  });
}

function makeBeddingQuestion(size, product, askMeasure) {
  const answer = beddingData[size][product.id][askMeasure ? 0 : 1];
  return {
    category: "ROPA DE CAMA",
    question: `Para <strong>${size}</strong>, ¿cuál es ${askMeasure ? "la <strong>medida</strong>" : "la <strong>talla</strong>"} de ${product.name.toLowerCase()}?`,
    answer,
    answerKind: askMeasure ? "measure" : "code",
    explanation: `${product.name} · ${size}: ${beddingData[size][product.id][0]} cm, talla ${beddingData[size][product.id][1]}.`
  };
}

function makeCushionQuestion(item, askMeasure) {
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

function makeStoreQuestion(item) {
  return {
    category: "MANUAL DE TIENDA",
    question: item.question,
    answer: item.answer,
    answerKind: "choice",
    choices: shuffled(item.choices),
    explanation: item.explanation
  };
}

function makeMapQuestion(target) {
  const label = target.type === "zone" ? `Zona ${target.id}` : `Pared ${target.id}`;
  return {
    category: target.type === "zone" ? "CROQUIS · ZONA" : "CROQUIS · PARED",
    question: `¿Dónde está la <strong>${label}</strong>?`,
    answer: `${target.type}:${target.id}`,
    answerKind: "map",
    masteryId: `map:${target.type}:${target.id}`,
    targetType: target.type,
    explanation: target.type === "zone"
      ? `La Zona ${target.id} corresponde a ${target.name}.`
      : `La Pared ${target.id} está marcada en verde en el croquis.`
  };
}

function measurementQuestionBank() {
  const beddingQuestions = Object.keys(beddingData).flatMap((size) => products.flatMap((product) => [true, false].map((askMeasure) => ({
    id: `bedding:${size}:${product.id}:${askMeasure ? "measure" : "code"}`,
    create: () => makeBeddingQuestion(size, product, askMeasure)
  }))));
  const cushionQuestions = cushionData.flatMap((item) => [true, false].map((askMeasure) => ({
    id: `cushion:${item.size}:${askMeasure ? "measure" : "code"}`,
    create: () => makeCushionQuestion(item, askMeasure)
  })));
  return [...beddingQuestions, ...cushionQuestions];
}

function storeQuestionBank() {
  return storeQuestions.map((item, index) => ({
    id: `store:${index}`,
    create: () => makeStoreQuestion(item)
  }));
}

function mapQuestionBank() {
  const targets = [
    ...mapZones.map((zone) => ({ ...zone, type: "zone" })),
    ...mapWalls.map((wall) => ({ ...wall, type: "wall" }))
  ];
  const completeBank = targets.map((target) => ({
    id: `map:${target.type}:${target.id}`,
    create: () => makeMapQuestion(target)
  }));
  const pendingBank = completeBank.filter((item) => !mapMastery.includes(item.id));
  return pendingBank.length ? pendingBank : completeBank;
}

function setupQuizMap() {
  const sourceMap = $("#storePlan");
  const frame = $("#quizMapFrame");
  if (!sourceMap || !frame) return;

  const quizMap = sourceMap.cloneNode(true);
  quizMap.removeAttribute("id");
  quizMap.removeAttribute("aria-labelledby");
  quizMap.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
  quizMap.classList.add("quiz-store-plan");
  quizMap.setAttribute("role", "group");
  quizMap.setAttribute("aria-label", "Croquis interactivo de las zonas de la tienda");
  quizMap.querySelectorAll(".zone-hotspots, .wall-hotspots").forEach((group) => group.removeAttribute("aria-hidden"));

  quizMap.querySelectorAll(".map-hit").forEach((hotspot) => {
    const targetType = hotspot.dataset.type;
    const targetId = hotspot.dataset.id;
    if (targetType !== currentQuestion.targetType) {
      hotspot.classList.add("inactive-target");
      return;
    }
    const targetKey = `${targetType}:${targetId}`;
    const targetLabel = targetType === "zone" ? `Zona ${targetId}` : `Pared ${targetId}`;
    hotspot.setAttribute("role", "button");
    hotspot.setAttribute("tabindex", "0");
    hotspot.setAttribute("aria-label", `Seleccionar ${targetLabel}`);
    const selectZone = () => {
      if (quizLocked) return;
      currentQuestion.selectedMapTarget = targetKey;
      quizMap.querySelectorAll(".map-hit").forEach((item) => item.classList.remove("selected"));
      hotspot.classList.add("selected");
      $("#quizAnswerFields").classList.remove("correct", "wrong");
    };
    hotspot.addEventListener("click", selectZone);
    hotspot.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectZone();
      }
    });
  });

  frame.append(quizMap);
}

function createQuestion() {
  quizLocked = false;
  currentQuestion = quizMode === "store"
    ? takeUnseenQuestion("store", storeQuestionBank())
    : quizMode === "map"
      ? takeUnseenQuestion("map", mapQuestionBank())
      : takeUnseenQuestion("measurements", measurementQuestionBank());
  const visibleNumber = activeQuizStats().answered + 1;
  $("#questionCategory").textContent = currentQuestion.category;
  $("#questionNumber").textContent = String(((visibleNumber - 1) % 99) + 1).padStart(2, "0");
  $("#questionText").innerHTML = currentQuestion.question;
  $("#quizAnswerFields").innerHTML = currentQuestion.answerKind === "map"
    ? `<div class="quiz-map-shell">
        <div class="quiz-map-toolbar"><p class="quiz-map-instruction">Toca ${currentQuestion.targetType === "zone" ? "la zona" : "la pared"} correcta</p><p class="map-mastery"><strong id="mapMasteryCount">${mapMastery.length}</strong> / 29 DOMINADAS</p></div>
        <div class="quiz-map-frame" id="quizMapFrame"></div>
      </div>`
    : currentQuestion.answerKind === "choice"
      ? `<fieldset class="quiz-options"><legend>ELIGE UNA RESPUESTA</legend>
      ${currentQuestion.choices.map((choice) => `<label><input class="quiz-choice" type="radio" name="quiz-choice" value="${choice}" /><span>${choice}</span></label>`).join("")}
      </fieldset>`
      : currentQuestion.answerKind === "measure"
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
  $$("#quizAnswerFields .quiz-choice").forEach((input) => input.addEventListener("change", () => {
    $("#quizAnswerFields").classList.remove("correct", "wrong");
    $$("#quizAnswerFields .quiz-options label").forEach((label) => label.classList.remove("correct-answer", "wrong-answer"));
  }));
  if (currentQuestion.answerKind === "map") setupQuizMap();
  $("#quizAnswerForm").classList.remove("hidden");
  $(".quiz-check-button").classList.remove("hidden");
  $("#answerNote").className = "answer-note hidden";
  $("#answerNote").textContent = "";
  $("#nextQuestionButton").classList.add("hidden");
  updateStats();
  const card = $("#questionCard");
  card.classList.toggle("map-question", currentQuestion.answerKind === "map");
  card.classList.remove("swap");
  void card.offsetWidth;
  card.classList.add("swap");
}

function submitQuizAnswer(event) {
  event.preventDefault();
  if (quizLocked) return;
  const inputs = $$("#quizAnswerFields .quiz-input");
  const selectedChoice = $("#quizAnswerFields .quiz-choice:checked");
  if (currentQuestion.answerKind === "map" && !currentQuestion.selectedMapTarget) {
    showToast(`Toca ${currentQuestion.targetType === "zone" ? "una zona" : "una pared"} del mapa antes de comprobar.`);
    return;
  }
  if (currentQuestion.answerKind === "choice" && !selectedChoice) {
    showToast("Elige una respuesta antes de comprobar.");
    return;
  }
  if (!["choice", "map"].includes(currentQuestion.answerKind) && inputs.some((input) => !input.value.trim())) {
    showToast("Escribe la respuesta completa antes de comprobar.");
    inputs.find((input) => !input.value.trim())?.focus();
    return;
  }

  const response = currentQuestion.answerKind === "map"
    ? currentQuestion.selectedMapTarget
    : currentQuestion.answerKind === "choice"
      ? selectedChoice.value
      : currentQuestion.answerKind === "measure"
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
  $$("#quizAnswerFields .quiz-choice").forEach((input) => {
    input.disabled = true;
    const label = input.closest("label");
    if (input.value === currentQuestion.answer) label.classList.add("correct-answer");
    else if (input.checked) label.classList.add("wrong-answer");
  });
  const quizMap = $("#quizAnswerFields .quiz-store-plan");
  if (quizMap) {
    quizMap.classList.add("locked");
    quizMap.querySelectorAll(".map-hit").forEach((hotspot) => {
      hotspot.removeAttribute("tabindex");
      const targetKey = `${hotspot.dataset.type}:${hotspot.dataset.id}`;
      if (targetKey === currentQuestion.answer) hotspot.classList.add("correct-answer");
      else if (targetKey === currentQuestion.selectedMapTarget) hotspot.classList.add("wrong-answer");
    });
  }
  $(".quiz-check-button").classList.add("hidden");

  const stats = activeQuizStats();
  stats.answered += 1;
  if (isCorrect) {
    stats.correct += 1;
    stats.streak += 1;
    if (currentQuestion.answerKind === "map" && !mapMastery.includes(currentQuestion.masteryId)) {
      mapMastery.push(currentQuestion.masteryId);
      saveMapMastery();
      const masteryCounter = $("#mapMasteryCount");
      if (masteryCounter) masteryCounter.textContent = mapMastery.length;
    }
  } else {
    stats.wrong += 1;
    stats.streak = 0;
  }
  saveQuizState();
  updateStats(true);

  const note = $("#answerNote");
  note.textContent = `${isCorrect ? "¡Correcto!" : "La respuesta correcta está marcada."} ${currentQuestion.explanation}`;
  note.classList.toggle("wrong", !isCorrect);
  note.classList.remove("hidden");
  $("#nextQuestionButton").classList.remove("hidden");

  requestAnimationFrame(() => {
    note.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "center"
    });
  });
}

function updateStats(animate = false) {
  const stats = activeQuizStats();
  $("#correctStat").textContent = stats.correct;
  $("#wrongStat").textContent = stats.wrong;
  $("#streakStat").textContent = stats.streak;
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
  const hasQuizProgress = Object.values(quizState).some((stats) => stats.correct || stats.wrong || stats.streak || stats.answered);
  const hasProgress = hasQuizProgress || hasTableAnswers;
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
  quizState = {
    measurements: { correct: 0, wrong: 0, streak: 0, answered: 0 },
    store: { correct: 0, wrong: 0, streak: 0, answered: 0 },
    map: { correct: 0, wrong: 0, streak: 0, answered: 0 }
  };
  quizHistory = {
    measurements: { used: [], last: null },
    store: { used: [], last: null },
    map: { used: [], last: null }
  };
  mapMastery = [];
  saveQuizState();
  saveQuizHistory();
  saveMapMastery();
  updateStats();
  if (currentQuestion) createQuestion();
  showToast("Práctica reiniciada. Empecemos de nuevo.");
}

setupFillTables();
setupModeSwitch();
setupLearningAreaSwitch();
setupNavigation();
setupQuizModeSwitch();
$("#quizAnswerForm").addEventListener("submit", submitQuizAnswer);
$("#nextQuestionButton").addEventListener("click", createQuestion);
$("#resetButton").addEventListener("click", resetProgress);
updateStats();
