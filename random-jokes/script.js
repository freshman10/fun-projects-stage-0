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
    chuckImg.style.width = "150px";
    chuckImg.src = "assets/img/chuck.png";
    getChuckJokes();
  } else if (currentLang === "ru") {
    chuckImg.src = "assets/img/monah.png";
    chuckImg.style.width = "250px";
    btn.textContent = "Стать мудрее!";
    getQuotes();
  }
  setTimeout(() => chuckImg.classList.remove("shake-img"), 500);
}
getData();

btn.addEventListener("click", getData);
switchLang.addEventListener("click", (e) => {
  if (e.target.dataset.set) {
    languageSwitch(e.target.dataset.set);
  }
});

const selfEstimation = `Total: 60/60

- Вёрстка +10
на странице есть цитата и кнопка для смены цитаты +5
в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
- При загрузке страницы приложения отображается рандомная цитата +10
- При перезагрузке страницы цитата обновляется (заменяется на другую) +10
- Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +10
-Смена цитаты сопровождается проигрыванием звука +10
- Можно выбрать один из двух языков отображения цитат: en/ru +10
`;

console.log(selfEstimation);
