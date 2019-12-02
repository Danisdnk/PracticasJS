const listaTweet = document.getElementById("lista-tweets");

envioFormulario();

function envioFormulario() {
  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarTweet);
  listaTweet.addEventListener("click", borrarTweet);
  document.addEventListener("DOMContentLoaded", localStorageReady);
}

function localStorageReady() {
  let tweeteos;
  tweeteos = ObtenerTweetsLocalStorage();
  tweeteos.forEach(function(tweet) {
    const btnBorrar = document.createElement("a");
    btnBorrar.classList = "borrar-tweet";
    btnBorrar.innerText = "X";
    const li = document.createElement("li");
    li.innerText = tweet;
    listaTweet.appendChild(li);
    li.appendChild(btnBorrar);
    agregarLocalStorage(tweet);
  });
  console.log(tweets);
}

function agregarTweet(e) {
  e.preventDefault();

  const tweet = document.getElementById("tweet").value;

  if (tweet.length <= 0) {
    alert("no puede ser vacio el campo");
  } else {
    const btnBorrar = document.createElement("a");
    btnBorrar.classList = "borrar-tweet";
    btnBorrar.innerText = "X";
    const li = document.createElement("li");
    li.innerText = tweet;
    listaTweet.appendChild(li);
    li.appendChild(btnBorrar);
    agregarLocalStorage(tweet);
  }
  console.log(tweet);
}
function borrarTweet(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    LocalStorageDelete(e.target.parentElement.innerText);
  }
}

function agregarLocalStorage(tweet) {
  let tweeteos;

  tweeteos = ObtenerTweetsLocalStorage();

  tweeteos.push(tweet);
  // Convertir de string a arreglo para local storage
  localStorage.setItem("tweeteos", JSON.stringify(tweeteos));
}

function ObtenerTweetsLocalStorage() {
  let tweeteos;
  if (localStorage.getItem("tweeteos") === null) {
    tweeteos = [];
  } else {
    tweeteos = JSON.parse(localStorage.getItem("tweeteos"));
  }
  return tweeteos;
}

function LocalStorageDelete(tweet) {
  let tweeteos, tweetBorrar;
  tweetBorrar = tweet.substring(0, tweet.length - 1);
  tweeteos = ObtenerTweetsLocalStorage();

  tweeteos.forEach(function(tweet, index) {
    console.log(tweet);
    if (tweetBorrar === tweet) {
      tweeteos.splice(index, 1);
    }
  });
  console.log(tweetBorrar);
  localStorage.setItem("tweeteos", JSON.stringify(tweeteos));
}
