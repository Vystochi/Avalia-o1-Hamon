const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')

let pontos = 0;
let recorde = localStorage.getItem('recorde') || 0;
function atualizarPontuacao() {
    document.getElementById('pontuacao').innerText = `Pontos: ${pontos} | Recorde: ${recorde}`;
}

const teclasPressionadas = {
   KeyW: false,
   KeyS: false,
   KeyD: false,
   KeyA: false
};
document.addEventListener('keydown', (e) => {
   for (let tecla in teclasPressionadas) {
       if (teclasPressionadas.hasOwnProperty(e.code)) {
           teclasPressionadas[tecla] = false;
       }
   }
   if (teclasPressionadas.hasOwnProperty(e.code)) {
       teclasPressionadas[e.code] = true;
   }
});

const imgCobra = new Image();
imgCobra.src = 'imagens/cobra.png';

class Entidade {
   constructor(x, y, largura, altura) {
       this.x = x
       this.y = y
       this.largura = largura
       this.altura = altura
   }
}


class Cobra extends Entidade {
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
    }
   desenhar() {
        ctx.save(); 
        ctx.translate(this.x + this.largura / 2, this.y + this.altura / 2); 
            if (this.direcao === 'W') {
        ctx.rotate(-Math.PI / 2); //gira pra cima
    } else if (this.direcao === 'S') {
        ctx.rotate(Math.PI / 2); //gira pra baixo
    } else if (this.direcao === 'A') {
        ctx.rotate(Math.PI); //gira pra esquerda
    } else if (this.direcao === 'D') {
        ctx.rotate(0); //gira pra direita
    }
    ctx.drawImage(imgCobra, -this.largura / 2, -this.altura / 2, this.largura, this.altura); // Desenha a imagem
    ctx.restore();
}
atualizar() {
    if (teclasPressionadas.KeyW) {
        this.y -= 3; // velocidade da cobra para cima
        this.direcao = 'W'; //muda a direção para cima
    } else if (teclasPressionadas.KeyS) {
        this.y += 3; // velocidade da cobra para baixo
        this.direcao = 'S'; //muda a direção para baixo
    } else if (teclasPressionadas.KeyA) {
        this.x -= 3; // velocidade da cobra para a esquerda
        this.direcao = 'A'; //muda a direção para esquerda
    } else if (teclasPressionadas.KeyD) {
        this.x += 3; // velocidade da cobra para a direita
        this.direcao = 'D'; //muda a direção para direita
    }
}
   verificarColisao(comida){
       if(
           this.x < comida.x + comida.largura &&
           this.x + this.largura > comida.x &&
           this.y < comida.y + comida.altura &&
           this.y + this.altura > comida.y
       ){ 
           this.#houveColisao(comida)
       }
   }
   verificarColisaoComParede(){ //verifica se a cobra bateu na parede
    if (this.x < 0 || this.x + this.largura > canvas.width || this.y < 0 || this.y + this.altura > canvas.height) {
        location.reload(); //recarrega a pagina ao morrer
    }
}
#houveColisao(comida) {
    comida.x = Math.random() * (canvas.width - 10);
    comida.y = Math.random() * (canvas.height - 10); //gera a fruta aleatoriamente
    pontos++;
    if (pontos > recorde) {
        recorde = pontos;
        localStorage.setItem('recorde', recorde); //ferifica se o recorde foi passado e atualiza para o novo recorde
    }
    atualizarPontuacao();
}
}

const imgFruta = new Image();
imgFruta.src = 'imagens/fruta.webp';

class Comida extends Entidade {
   constructor() {
       super(Math.random()*canvas.width-10, Math.random()*canvas.height-10, 40, 40) //tamanho da fruta
   }
   desenhar() {
       ctx.drawImage(imgFruta, this.x, this.y, this.largura, this.altura) //foto da fruta
   }
}


const cobra = new Cobra(100, 200, 74, 74) //tamanho da cobra
const comida = new Comida()


function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cobra.desenhar(); //desenha a cobra
    cobra.atualizar(); //atualiza a posicao da cobra
    cobra.verificarColisaoComParede(); //verifica se a cobra bateu na parede
    comida.desenhar(); //desenha a fruta
    cobra.verificarColisao(comida); //verifica se a cobra comeu a comida
    requestAnimationFrame(loop); //da loop no jogo
}

atualizarPontuacao(); //atualiza a pontuação
loop();
