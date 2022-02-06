"use strinct";

const urlRandomJoke = "https://api.icndb.com/jokes/random";

const btn = document.querySelector(".btn");
const jokeContent = document.querySelector(".joke");
const chuckImg = document.querySelector(".chuck-img");
const body = document.querySelector("body");
const audio = document.querySelector("audio");
const switchLang = document.querySelector(".switch-lang");
let currentLang = "en";
const languages = document.querySelectorAll(".lang");
let currentQuoteNumber = 0;

function languageSwitch(lang) {
  currentLang = lang;
  getData();
  languages.forEach((el) => {
    if (lang !== el.dataset.set) {
      el.classList.remove("active-lang");
    } else {
      el.classList.add("active-lang");
    }
  });
}

function getRandomNumber(min = 0, max = 100) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function pushNewWisdom(data) {
  jokeContent.textContent = data.text + ". \n " + data.author;
}

async function getQuotes() {
  const quotes = "assets/quotes/quotes.json";
  const res = await fetch(quotes);
  const data = await res.json();
  let randomNumber = getRandomNumber(0, data.length - 1);
  while (randomNumber === currentQuoteNumber) {
    randomNumber = getRandomNumber(0, data.length - 1);
  }
  currentQuoteNumber = randomNumber;

  pushNewWisdom(data[randomNumber]);
}

async function getChuckJokes() {
  const res = await fetch(urlRandomJoke);
  const data = await res.json();
  if (data.type === "success") {
    pushNewJoke(data.value.joke);
  }
}

function pushNewJoke(joke) {
  joke = joke.replaceAll("&quot;", '"');
  jokeContent.textContent = joke;
}

async function getData() {
  audio.src = "assets/mp3/reload.mp3";
  audio.play();
  chuckImg.classList.add("shake-img");

  if (currentLang === "en") {
    btn.textContent = "Make me laugh, Chuck!";
    chuckImg.src = "assets/img/chuck.png";
    getChuckJokes();
  } else if (currentLang === "ru") {
    chuckImg.src = "assets/img/monah.jpeg";
    btn.textContent = "Хочу еще мудрости!";
    getQuotes();
  }
  setTimeout(() => chuckImg.classList.remove("shake-img"), 500);
}

btn.addEventListener("click", getData);
switchLang.addEventListener("click", (e) => {
  if (e.target.dataset.set) {
    console.log(e.target.dataset.set);
    languageSwitch(e.target.dataset.set);
  }
});
