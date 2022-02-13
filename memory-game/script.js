"use strict";

const gameWindow = document.querySelector(".game-window");
const units = 10;
let unitsList = [];
const animals = [
  "bear",
  "cat",
  "dog",
  "fox",
  "lion",
  "monkey",
  "owl",
  "panda",
  "pig",
  "rabbit",
];
let randomAnimal = {};
let waitFlag = true;
const score = document.querySelector(".score");
const labelScore = document.querySelector(".label-score");
const newGameBtn = document.querySelector(".new-game-btn");
const points = 100;
const hamburger = document.querySelector(".hamburger-container");
const lines = document.querySelectorAll(".line");
const menuContainer = document.querySelector(".menu-container");
let scoresMenuList = [];
let scoresStorage = [];

function getSavedResults() {
  for (let i = 0; i < 10; i++) {
    const value = localStorage.getItem(`score${i}`);
    if (value !== "undefined" && value !== "null") {
      scoresStorage.push(value);
    }
  }
  updateMenu();
}
getSavedResults();

function addScore(score) {
  scoresStorage.unshift(score);
  if (scoresStorage.length > 10) {
    scoresStorage = scoresStorage.slice(0, 10);
  }
  updateLocalStorage();
  updateMenu();
}

function updateMenu() {
  let i = 0;
  scoresMenuList;
  for (let item of scoresMenuList) {
    if (scoresStorage[i]) {
      item.innerHTML = scoresStorage[i];
    } else {
      item.innerHTML = "-";
    }
    i++;
  }
}

function updateLocalStorage() {
  localStorage.clear();
  for (let i = 0; i < 10; i++) {
    localStorage.setItem(`score${i}`, scoresStorage[i]);
  }
}

function getRandom(units) {
  function randomNumber(units) {
    return Math.round(Math.random() * (units - 1));
  }
  let animalsCount = {};
  for (let animal of animals) {
    animalsCount[animal] = 2;
  }
  for (let i = 0; i < units * 2; i++) {
    let number = randomNumber(units);
    if (animalsCount[animals[number]] > 0) {
      randomAnimal[i] = animals[number];
      animalsCount[animals[number]]--;
    } else {
      randomAnimal[i] = "";
    }
  }
  for (let [an, val] of Object.entries(animalsCount)) {
    while (val !== 0) {
      val--;
      for (let [key, value] of Object.entries(randomAnimal)) {
        if (value === "") {
          randomAnimal[key] = an;
          break;
        }
      }
    }
  }
  return randomAnimal;
}

function init() {
  if (!menuContainer.children.length) {
    for (let i = 0; i < 10; i++) {
      const el = document.createElement("p");
      el.classList.add(`score${i}`);
      el.innerHTML = "-";
      menuContainer.appendChild(el);
    }
  }
  lines.forEach((el, i) => el.classList.remove(`line${i + 1}`));
  menuContainer.classList.add("hide-menu");
  waitFlag = true;
  const animalOrder = getRandom(units);
  for (let i = 0; i < units * 2; i++) {
    const el = document.createElement("div");
    el.classList.add("game-card");
    el.dataset.set = animalOrder[i];
    gameWindow.appendChild(el);
    const backCardSide = document.createElement("div");
    const frontCardSide = document.createElement("div");
    backCardSide.classList.add("back-side");
    frontCardSide.classList.add("face-side");
    const imgBack = document.createElement("img");
    const imgFront = document.createElement("img");
    imgBack.src = "assets/svg/back-card.svg";

    imgFront.src = `assets/svg/${animalOrder[i]}.svg`;
    frontCardSide.style.visibility = "hidden";
    backCardSide.appendChild(imgBack);
    frontCardSide.appendChild(imgFront);
    el.appendChild(backCardSide);
    el.appendChild(frontCardSide);
    unitsList.push(el);
  }

  unitsList.forEach((el) => {
    el.addEventListener("click", function (e) {
      let card = e.target;
      while (!card.classList.contains("game-card")) {
        card = card.parentElement;
      }
      if (!card.classList.contains("opened") && waitFlag) {
        openCard(card);
        const opened = document.querySelectorAll(".opened");

        if (
          [...opened].filter((a) => a.dataset.set === card.dataset.set)
            .length === 2
        ) {
          document
            .querySelectorAll(`[data-set=${card.dataset.set}]`)
            .forEach((el) => el.classList.add("match"));
        }
        const matched = document.querySelectorAll(".match");

        if (matched.length === units * 2) {
          console.log("done");
          addScore(score.innerHTML);
          labelScore.innerHTML = `Good job! Your score is ${score.innerHTML}`;
          score.innerHTML = "";
          newGameBtn.classList.remove("hidden");
        }

        if (opened.length - matched.length === 2) {
          waitFlag = false;
          window.setTimeout(function () {
            waitFlag = true;
            opened.forEach((card) => {
              if (!card.classList.contains("match")) {
                closeCard(card);
                decreaseScore(0.5);
              }
            });
          }, 1000);
        }
      }
    });
  });

  score.innerHTML = points;
  labelScore.innerHTML = "Current score: ";
  newGameBtn.classList.add("hidden");
  scoresMenuList = document.querySelector(".menu-container").children;
  updateMenu();
}

function closeCard(card) {
  const backSide = card.querySelector(".back-side");
  const faceSide = card.querySelector(".face-side");
  faceSide.style.visibility = "hidden";
  backSide.style.visibility = "visible";
  card.classList.remove("opened");
}

function openCard(card) {
  const backSide = card.querySelector(".back-side");
  const faceSide = card.querySelector(".face-side");
  faceSide.style.visibility = "visible";
  backSide.style.visibility = "hidden";
  card.classList.add("opened");
}

function switchLayer(card) {
  const backSide = card.querySelector(".back-side");
  const faceSide = card.querySelector(".face-side");
  if (!card.classList.contains("opened")) {
    faceSide.style.visibility = "visible";
    backSide.style.visibility = "hidden";
  } else {
    faceSide.style.visibility = "hidden";
    backSide.style.visibility = "visible";
  }
  card.classList.toggle("opened");
}

init();

function decreaseScore(points) {
  const currentScore = Number(score.innerHTML);
  if (currentScore > 0) {
    score.innerHTML = currentScore - points;
  } else {
    score.innerHTML = "You lose !";
    labelScore.innerHTML = "";
    newGameBtn.classList.remove("hidden");
    waitFlag = false;
    addScore(0);
  }
}

newGameBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("clicked");
  unitsList.forEach((el) => el.remove());
  unitsList = [];
  init();
});

hamburger.addEventListener("click", function (e) {
  lines.forEach((el, i) => el.classList.toggle(`line${i + 1}`));
  menuContainer.classList.toggle("hide-menu");
});
