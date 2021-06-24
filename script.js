const canvas = document.getElementById('canvas');
const ctx= canvas.getContext('2d');
const img = new Image();
img.src = './media/flappy-bird-set.png';

//general settings
let gamePlaying = false;        //toggle : je joue ou non ?
const gravity = .5;
const speed = 6.2;
const size = [51,36];           //Taille de l'oiseau (utilisé dans drawImage())
const jump = -11.5;
const cTenth = (canvas.width / 10);

let index = 0,
    bestScore = 0,
    currentScore = 0,
    pipes = [],
    flight,
    flyHeight;

let render = () => {
    index ++;
    
    ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width / 2 ) - size[0] / 2), flyHeight,...size);                            
                                                //C'est lui qui va copier l'image original et l'ajouter sur le jeux
                                            
    flyHeight = (canvas.height / 2) - (size[1] / 2);

    window.requestAnimationFrame(render);       //Cette fonction va faire l'animation. 
                                                //En gros "index ++" va ajouter des valeurs et le
                                                //RequestAnimationFrame va recharger l'animation.

}
img.onload = render;                            //Au chargement de l'image, on lance le render
