const nav = document.getElementById("nav");
const btnMenu = document.getElementById("hamburguer");

let indiceSlide = 1;
const slides = document.querySelectorAll('#carrossel img');
const controles = document.querySelectorAll('.controle');
const totalSlides = slides.length;
const tempoIntervalo = 10000;
let intervaloSlide = setInterval(proximoSlide, tempoIntervalo);
let touchStartX = 0;
let touchEndX = 0;

function exibirSlide(n) {
  slides.forEach(slide => slide.classList.remove('ativo'));
  controles.forEach(controle => controle.classList.remove('ativo'));
  slides[n - 1].classList.add('ativo');
  controles[n - 1].classList.add('ativo');
}

function proximoSlide() {
  indiceSlide = (indiceSlide % totalSlides) + 1;
  exibirSlide(indiceSlide);
}

function anteriorSlide() {
  indiceSlide = (indiceSlide - 2 + totalSlides) % totalSlides + 1;
  exibirSlide(indiceSlide);
}

function mudarSlide(n) {
  clearInterval(intervaloSlide);
  indiceSlide = n;
  exibirSlide(indiceSlide);
  intervaloSlide = setInterval(proximoSlide, tempoIntervalo);
}

document.querySelector('.prev-btn').addEventListener('click', () => {
  clearInterval(intervaloSlide);
  anteriorSlide();
  intervaloSlide = setInterval(proximoSlide, tempoIntervalo);
});

document.querySelector('.next-btn').addEventListener('click', () => {
  clearInterval(intervaloSlide);
  proximoSlide();
  intervaloSlide = setInterval(proximoSlide, tempoIntervalo);
});

controles.forEach(controle => {
  controle.addEventListener('click', () => {
    mudarSlide(parseInt(controle.dataset.slide));
  });
});

document.querySelector('#carrossel').addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('#carrossel').addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50) {
    clearInterval(intervaloSlide);
    proximoSlide();
    intervaloSlide = setInterval(proximoSlide, tempoIntervalo);
  }
  else if (touchEndX - touchStartX > 50) {
    clearInterval(intervaloSlide);
    anteriorSlide();
    intervaloSlide = setInterval(proximoSlide, tempoIntervalo);
  }
});

btnMenu.addEventListener("click", () => {
  nav.classList.toggle("active");
  btnMenu.innerHTML = nav.classList.contains("active") ? "&#10005;" : "&#9776;";
});

function submitForm() {
  alert('Formulário enviado! (Funcionalidade de envio tem q ser implementada)');
}