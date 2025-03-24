const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')


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


class Entidade {
   constructor(x, y, largura, altura) {
       this.x = x
       this.y = y
       this.largura = largura
       this.altura = altura
   }
   desenhar (){
       ctx.fillStyle = 'black'
       ctx.fillRect(this.x, this.y, this.largura, this.altura)
   }
}


class Cobra extends Entidade {
   constructor(x, y, largura, altura) {
       super(x, y, largura, altura)
   }
   desenhar() {
         ctx.fillStyle = 'green' //cor da cobra
         ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
   atualizar() {
       if (teclasPressionadas.KeyW) {
           this.y -= 3 //velocidade da cobra para cima
       } else if (teclasPressionadas.KeyS) {
           this.y += 3 //velocidade da cobra para baixo
       } else if (teclasPressionadas.KeyA) {
           this.x -= 3 //velocidade da cobra para esquerda
       } else if (teclasPressionadas.KeyD) {
           this.x += 3 //velocidade da cobra para direita
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
        alert("Game Over!");
    }
}
   #houveColisao(comida){
       comida.x = Math.random()*canvas.width-10
       comida.y = Math.random()*canvas.height-10
   }
}
class Comida extends Entidade {
   constructor() {
       super(Math.random()*canvas.width-10, Math.random()*canvas.height-10, 20, 20)
   }
   desenhar() {
       ctx.fillStyle = 'red' //cor da fruta
       ctx.fillRect(this.x, this.y, this.largura, this.altura)
   }
}


const cobra = new Cobra(100, 200, 20, 20)
const comida = new Comida()


function loop() {
   ctx.clearRect(0, 0, canvas.width, canvas.height)
   cobra.desenhar()
   cobra.atualizar()
    cobra.verificarColisaoComParede()
   comida.desenhar()
   cobra.verificarColisao(comida)
   requestAnimationFrame(loop)
}
loop()
