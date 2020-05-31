import Boid from "./boid.js";

const canvas = document.getElementById('flocking-canvas');
const g2d = canvas.getContext('2d');

let flock = new Array();

canvas.width = 500;
canvas.height = 500;

for(let i = 0; i < 1; i++)
{
    let boid = new Boid(Math.random()*canvas.width,Math.random()*canvas.height);
    flock[i] = boid;
}

function loop()
{
    //clear
    g2d.fillStyle = "#ffffff";
    g2d.fillRect(0,0,500,500);
    for(let b in flock)
    {
       flock[b].display();        
       flock[b].update(flock);
    }
    window.requestAnimationFrame(loop) 
}
loop();