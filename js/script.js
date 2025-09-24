// Define o índice inicial do slide (1-based indexing)
let indiceSlide = 1;

// Seleciona todas as imagens dentro do elemento com id 'carrossel'
const slides = document.querySelectorAll('#carrossel img');

// Seleciona todos os elementos com classe 'controle' (bolinhas de navegação do carrossel)
const controles = document.querySelectorAll('.controle');

// Armazena o número total de slides
const totalSlides = slides.length;

// Define o intervalo de tempo (em milissegundos) para troca automática de slides (10 segundos)
const tempoIntervalo = 10000;

// Inicia um intervalo que chama a função proximoSlide a cada 10 segundos
let intervaloSlide = setInterval(proximoSlide, tempoIntervalo);

// Variáveis para rastrear a posição inicial e final do toque em dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;

// Função para exibir um slide específico com base no índice fornecido
function exibirSlide(n) {
  // Remove a classe 'ativo' de todos os slides (esconde todos)
  slides.forEach(slide => slide.classList.remove('ativo'));
  // Remove a classe 'ativo' de todos os controles (desativa bolinhas)
  controles.forEach(controle => controle.classList.remove('ativo'));
  // Adiciona a classe 'ativo' ao slide correspondente ao índice (n-1, pois índices são 0-based)
  slides[n - 1].classList.add('ativo');
  // Adiciona a classe 'ativo' ao controle correspondente
  controles[n - 1].classList.add('ativo');
}

// Função para avançar para o próximo slide
function proximoSlide() {
  // Calcula o próximo índice, usando módulo para ciclar de volta ao primeiro slide
  indiceSlide = (indiceSlide % totalSlides) + 1;
  // Exibe o slide correspondente
  exibirSlide(indiceSlide);
}

// Função para voltar ao slide anterior
function anteriorSlide() {
  // Calcula o índice do slide anterior, garantindo ciclagem (se no primeiro, vai para o último)
  indiceSlide = (indiceSlide - 2 + totalSlides) % totalSlides + 1;
  // Exibe o slide correspondente
  exibirSlide(indiceSlide);
}

// Função para mudar diretamente para um slide específico (usada pelos controles)
function mudarSlide(n) {
  // Para o intervalo automático para evitar conflitos
  clearInterval(intervaloSlide);
  // Define o índice do slide desejado
  indiceSlide = n;
  // Exibe o slide correspondente
  exibirSlide(indiceSlide);
  // Reinicia o intervalo automático
  intervaloSlide = setInterval(proximoSlide, tempoIntervalo);
}

// Adiciona um evento de clique ao botão "anterior"
document.querySelector('.prev-btn').addEventListener('click', () => {
  // Para o intervalo automático
  clearInterval(intervaloSlide);
  // Chama a função para exibir o slide anterior
  anteriorSlide();
  // Reinicia o intervalo automático
  intervaloSlide = setInterval(proximoSlide, tempoIntervalo);
});

// Adiciona um evento de clique ao botão "próximo"
document.querySelector('.next-btn').addEventListener('click', () => {
  // Para o intervalo automático
  clearInterval(intervaloSlide);
  // Chama a função para exibir o próximo slide
  proximoSlide();
  // Reinicia o intervalo automático
  intervaloSlide = setInterval(proximoSlide, tempoIntervalo);
});

// Adiciona eventos de clique a cada controle (bolinha) do carrossel
controles.forEach(controle => {
  controle.addEventListener('click', () => {
    // Chama mudarSlide com o número do slide associado ao controle (armazenado no atributo data-slide)
    mudarSlide(parseInt(controle.dataset.slide));
  });
});

// Suporte a gestos de toque para dispositivos móveis
// Registra a posição inicial do toque no carrossel
document.querySelector('#carrossel').addEventListener('touchstart', e => {
  // Armazena a coordenada X do ponto inicial do toque
  touchStartX = e.changedTouches[0].screenX;
});

// Registra a posição final do toque e determina a direção do deslize
document.querySelector('#carrossel').addEventListener('touchend', e => {
  // Armazena a coordenada X do ponto final do toque
  touchEndX = e.changedTouches[0].screenX;
  // Se o deslize for para a esquerda (maior que 50px), avança para o próximo slide
  if (touchStartX - touchEndX > 50) {
    clearInterval(intervaloSlide); // Para o intervalo automático
    proximoSlide(); // Avança para o próximo slide
    intervaloSlide = setInterval(proximoSlide, tempoIntervalo); // Reinicia o intervalo
  }
  // Se o deslize for para a direita (maior que 50px), volta para o slide anterior
  else if (touchEndX - touchStartX > 50) {
    clearInterval(intervaloSlide); // Para o intervalo automático
    anteriorSlide(); // Volta para o slide anterior
    intervaloSlide = setInterval(proximoSlide, tempoIntervalo); // Reinicia o intervalo
  }
});

// Função para lidar com o envio do formulário
function submitForm() {
  // Exibe um alerta informando que o formulário foi enviado (funcionalidade real a ser implementada)
  alert('Formulário enviado! (Funcionalidade de envio a ser implementada)');
}