// DOM elements

const currentColor = document.getElementById("current-color");
const chosenColor = document.getElementById("chosen-color");
const currentColorDisplay = document.getElementById("current-color-display");
const hexDisplay = document.getElementById("color-hex");
const previousColorDisplay = document.getElementById("previous-color-display");
const savedDisplay = document.getElementById("user-colors");
const rInput = document.getElementById("r-input");
const gInput = document.getElementById("g-input");
const bInput = document.getElementById("b-input");
const colorNameInput = document.getElementById("color-name");
const previewBtn = document.getElementById("preview");
const submitBtn = document.getElementById("submit");
let userColors = [];
let prevColors = [];

// Functions

function UserColor(r, g, b, name, hexNum) {
  this.name = name;
  this.r = r;
  this.g = g;
  this.b = b;
  this.hexNum = hexNum;
}
function renderSaved() {
  savedDisplay.innerHTML = "";
  userColors.forEach((color) => {
    const colorUl = document.createElement("ul");
    colorUl.classList.add("list-group", "list-group-horizontal");

    const colorLi = document.createElement("li");
    colorLi.classList.add("list-group-item");

    const colorSamp = document.createElement("li");
    colorSamp.classList.add("color-sample", "list-group-item");

    colorUl.appendChild(colorLi);
    colorUl.appendChild(colorSamp);

    savedDisplay.appendChild(colorUl);

    colorLi.innerHTML = `name: ${color.name} </br> rgb(${color.r},${color.g},${color.b}) </br> hex(${color.hexNum})`;
    colorSamp.style.backgroundColor = `rgb(${color.r},${color.g},${color.b})`;
  });
}

function previewColor() {
  if (
    rInput.value > 255 ||
    gInput.value > 255 ||
    bInput.value > 255 ||
    rInput.value == "" ||
    gInput.value == "" ||
    bInput.value == ""
  ) {
    alert("you have to type in a number. \nit should not be higher than 255");
  } else {
    prevColors.push({
      r: rInput.value,
      g: gInput.value,
      b: bInput.value,
      hexNum: convertHex(),
    });

    colorNameInput.value = "";
    renderCards();
  }
}
function convertHex() {
  let hexR = Math.abs(rInput.value).toString(16);
  let hexG = Math.abs(gInput.value).toString(16);
  let hexB = Math.abs(bInput.value).toString(16);
  let hexNum = `#${hexR}${hexG}${hexB}`;
  return hexNum;
}

function makeNewColor() {
  userColors.push(prevColors[prevColors.length - 1]);
  userColors[userColors.length - 1].name = colorNameInput.value;
  saveColor();
}

function renderCards() {
  currentColorDisplay.style.backgroundColor = `rgb(${rInput.value},${gInput.value},${bInput.value})`;
  hexDisplay.innerHTML =
    `hex value: ` + prevColors[prevColors.length - 1].hexNum;
  prevColors.length - 2 >= 0
    ? (previousColorDisplay.style.backgroundColor = `rgb(${
        prevColors[prevColors.length - 2].r
      },${prevColors[prevColors.length - 2].g},${
        prevColors[prevColors.length - 2].b
      })`)
    : null;
}

function saveColor() {
  localStorage.setItem("userColorsArr", JSON.stringify(userColors));
}

function getSaved() {
  if (localStorage.getItem("userColorsArr")) {
    userColors = JSON.parse(localStorage.getItem("userColorsArr") || []);
    renderSaved();
  }
}
function clearInputs() {
  rInput.value = "";
  gInput.value = "";
  bInput.value = "";
}
// Events

getSaved();

previewBtn.addEventListener("click", () => {
  previewColor();
  clearInputs();
});

submitBtn.addEventListener(`click`, () => {
  makeNewColor();

  getSaved();
});
