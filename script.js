const papers = [
    { name: "Обычная", rate: 1.5 },
    { name: "Повышенной белизны", rate: 2.5 },
    { name: "Мелованная", rate: 4 },
    { name: "Дизайнерская", rate: 6 }
];

const colors = [
    { name: "1-0", setup: 100, run: 15 },
    { name: "1-1", setup: 150, run: 25 },
    { name: "4-0", setup: 200, run: 60 },
    { name: "4-1", setup: 210, run: 85 },
    { name: "4-4", setup: 220, run: 112 }
];

const PER_SHEET = 30;
const MIN_ORDER = 30;

const form = document.getElementById("form");
const qtyInput = document.getElementById("qty");
const paperInput = document.getElementById("paper");
const colorInput = document.getElementById("color");
const priceBox = document.getElementById("price");

function fillSelect(select, items) {
    for (const item of items) {
        const option = document.createElement("option");
        option.value = item.name;
        option.textContent = item.name;
        select.append(option);
    }
}

function pickByName(items, name) {
    return items.find(item => item.name === name);
}

function computeTotal() {
    const quantity = Math.max(MIN_ORDER, Number(qtyInput.value) || 0);
    const sheets = Math.ceil(quantity / PER_SHEET);

    const paper = pickByName(papers, paperInput.value);
    const color = pickByName(colors, colorInput.value);

    return color.setup + paper.rate * sheets + color.run * sheets;
}

function refresh() {
    priceBox.textContent = computeTotal().toLocaleString("ru-RU");
}

fillSelect(paperInput, papers);
fillSelect(colorInput, colors);

form.addEventListener("input", refresh);

refresh();