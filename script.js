"use-strict";

let myFavoriteColor = [];
let colorValue;
let isColred = false;
const redInput = document.getElementById("red-picker");
const blueInput = document.getElementById("blue-picker");
const greenInput = document.getElementById("green-picker");
const btnColor = document.getElementById("change-color");
const result = document.getElementById("result-div");
const result2 = document.getElementById("result-div2");
const favorite = document.getElementById("favorite");
const showFavorite = document.getElementById("show-favorite");

function RGBToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

btnColor.addEventListener("click", createColor);
function createColor() {
  const rgbInput = `rgb(`;
  colorValue = `${redInput.value},${blueInput.value},${greenInput.value}`;

  const hexColor = RGBToHex(
    Number(redInput.value),
    Number(greenInput.value),
    Number(blueInput.value)
  );

  if (!isColred) {
    result.innerText = `first color ${rgbInput}${colorValue}) and ${hexColor}`;
    console.log(colorValue);
    result.style.backgroundColor = rgbInput + colorValue;
    isColred = true;
  } else {
    result2.innerText = `second color ${rgbInput}${colorValue}) and ${hexColor}`;
    result2.style.backgroundColor = rgbInput + colorValue;
    isColred = false;
  }

  resetInput();
}

function addToFavorite() {
  myFavoriteColor.push({ colorValue });
  console.log(myFavoriteColor);
  localStorage.setItem("color", JSON.stringify(myFavoriteColor));
  showFavorite.innerText = `my favorite color is: ${JSON.stringify(
    myFavoriteColor
  )}`;
}

favorite.addEventListener("click", addToFavorite);

function resetInput() {
  redInput.value = "";
  blueInput.value = "";
  greenInput.value = "";
  showFavorite.innerText = "";
}
