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

    //backGround
    ctx.drawImage(img, 0,0, canvas.width, canvas.height, -((index *(speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);  
    ctx.drawImage(img, 0,0, canvas.width, canvas.height, -((index *(speed / 2)) % canvas.width), 0, canvas.width, canvas.height);

    //Explication le drawImage va récupérer l'image de fond et la coller sur le canvas. Le modulo permettra de répéter la manoeuvre a chaque fois
    // et le fais de doubler le drawImage tout en enlevant le paramettre "+canvas.width" va permettre de créer un decallage dans le déplacement 
    //ce qui donnera l'impression que c'est continue alors que c'est deux images qui se suivent petit à petit

    if (gamePlaying){
        ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, cTenth, flyHeight, ...size); 
                                                //placer l'oiseau a gauche de l'ecran pour débuter le jeux
        flight += gravity;
        flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);

    }else{
    ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width / 2 ) - size[0] / 2), flyHeight,...size);                            
                                                //C'est lui qui va copier l'image original et l'ajouter sur le jeux                                           
    flyHeight = (canvas.height / 2) - (size[1] / 2);

    //interface visuelle (écriture)
    ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245);
    ctx.fillText('Cliquez pour jouer', 48, 535);
    ctx.font = "bold 30px courier";
    }
    window.requestAnimationFrame(render);       //Cette fonction va faire l'animation. 
                                                //En gros "index ++" va ajouter des valeurs et le
                                                //RequestAnimationFrame va recharger l'animation.

}
img.onload = render;                            //Au chargement de l'image, on lance le render

document.addEventListener('click', () => gamePlaying = true);
                                                //Fonction fléché, au click, gamePlayin passe a trou donc le jeux se lance
window.onclick = () => flight = jump;           // le jump ici va permettre de faire sauter l'oiseau. I

