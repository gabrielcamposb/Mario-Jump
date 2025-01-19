const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')

const jump = () => { // Função que simula o pulo do mario
    mario.classList.add('jump') // Adiciona a classe 'jump' que contém a animação de pulo ao mario

    setTimeout(() => { // Após 500ms (tempo da animação de pulo), remove a classe 'jump' para permitir que o mario possa pular novamente
        mario.classList.remove('jump') // Remove a classe 'jump', finalizando a animação do pulo
    }, 500) // O tempo de 500ms deve ser o mesmo tempo que dura a animação de pulo
}

const loop = setInterval(() => { // Função de loop que verifica a posição do tubo e para sua animação quando ele chega na posição de 120px da esquerda
    const pipePosition = pipe.offsetLeft // Obtém a posição do tubo a partir da borda esquerda da tela
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '') // Obtém a posição vertical do mario, removendo a unidade 'px' e convertendo o valor em número
    const cloudsPosition = window.getComputedStyle(clouds).left; // Obtém a posição atual das nuvens

    // Quando o tubo atinge a posição 120px ou menos da esquerda e o mario não pulou o suficiente (marioPosition < 80), isso indica uma colisão entre o mario e o tubo
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none' // Para a animação do tubo, fazendo-o parar de se mover
        pipe.style.left = `${pipePosition}px` // Define a posição atual do tubo para mantê-lo no mesmo lugar

        mario.style.animation = 'none' // Para a animação do mario quando ele colide com o tubo
        mario.style.bottom = `${marioPosition}px` // Define a posição do mario onde ele bateu no tubo, impedindo-o de continuar subindo
        mario.src = 'images/game-over.png' // Substitui a imagem do mario pela imagem de game over
        mario.style.width = '75px' // Reduz a largura da imagem do mario
        mario.style.marginLeft = '50px' // Ajusta o posicionamento horizontal do mario

        clouds.style.animation = 'none' // Para a animação das nuvens quando o jogo acaba
        clouds.style.left = cloudsPosition; // Define a posição exata das nuvens

        clearInterval(loop) // Interrompe o loop que verifica a posição do tubo, encerrando a detecção de colisões
    }
}, 10); // Executa a função a cada 10 milissegundos, verificando constantemente a posição do tubo e do mario

document.addEventListener('keydown', jump) // Adiciona um evento de 'keydown' para ativar o pulo do mario quando a tecla é pressionada