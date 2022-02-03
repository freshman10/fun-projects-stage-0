"use strict";

//init
const header = document.querySelector(".container");
const main = document.querySelector(".main");
const birdTypesNav = document.querySelectorAll(".header-list li");
let birdTypes = [];
birdTypesNav.forEach((el) => {
  birdTypes.push(el.dataset.item);
});
const playButtonStates = ["play", "pause"];
const playButton = document.querySelector(".play");
let isPlay = false;
const audio = document.querySelector("audio");
let playNum = 0;

//console.log(birdTypesNav, birdTypes, audio);

// Functions
function changeMainBG(birdType) {
  if (birdTypes.includes(birdType)) {
    main.style.backgroundImage = `url('assets/img/${birdType}.jpg')`;
  }
}

function changePlayerButton(state) {
  if (playButtonStates.includes(state)) {
    playButton.style.backgroundImage = `url('assets/svg/${state}.svg')`;
  }
}

function setActiveBirdType(birdType) {
  if (birdTypes.includes(birdType)) {
    birdTypesNav.forEach((el) => {
      if (birdType !== el.dataset.item) {
        el.classList.remove("active-nav-tab");
      } else {
        el.classList.add("active-nav-tab");
      }
    });
  }
}

function headerClick(e) {
  const bird = e.target.dataset.item;
  if (birdTypes.includes(bird)) {
    initialize(bird);
    playNum = birdTypes.indexOf(bird);
  }
}

function buttonClick() {
  isPlay = !isPlay;
  console.log("clicked");
  if (isPlay) {
    changePlayerButton("pause");
    audio.play();
  } else {
    changePlayerButton("play");
    audio.pause();
  }
}

function loadAudio(birdType) {
  if (birdTypes.includes(birdType)) {
    audio.src = `assets/audio/${birdType}.mp3`;
    audio.currentTime = 0;
  }
}

function initialize(bird) {
  changeMainBG(bird);
  changePlayerButton("play");
  setActiveBirdType(bird);
  loadAudio(bird);
  isPlay = false;
}

// init
initialize("slavka");
// nav panel click
header.addEventListener("click", (e) => {
  headerClick(e);
});

// playButton click

playButton.addEventListener("click", buttonClick);

// switch melody by keys
document.onkeydown = checkKey;
function checkKey(e) {
  if (e.keyCode == "37") {
    playNum = playNum - 1 < 0 ? birdTypes.length - 1 : playNum - 1;
    initialize(birdTypes[playNum]);
  } else if (e.keyCode == "39") {
    playNum = playNum + 1 > birdTypes.length - 1 ? 0 : playNum + 1;
    initialize(birdTypes[playNum]);
  }
}

const mark = `Total: 70/60.

Все требования выполнены.
В дополнение было реализовано переключение мелодий с помощью хоткеев(стрелки влево/вправо)

1.Вёрстка +10
    -есть не меньше пяти интерактивных элементов, с которыми пользователи могут взаимодействовать. Изменение внешнего вида самого элемента и состояния курсора при наведении, плавные анимации +5
    -в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2.При кликах по интерактивным элементам меняется изображение +10
3.При кликах по интерактивным элементам меняется звук +10
4.Активный в данный момент интерактивный элемент выделяется стилем +10
5.Кнопка Play/Pause +20
    -есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание звука +10
    -внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент звук +10
6. Дополнительный функционал : переключение мелодий хоткеями влево/вправо.



`;

console.log(mark);
