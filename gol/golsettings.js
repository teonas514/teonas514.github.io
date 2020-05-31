import GameOfLife from "./gol.js";

const canvas = document.getElementById('gol-canvas');
canvas.width = 700;
canvas.height = 700;

const g2d = canvas.getContext('2d');
g2d.globalAlpha = 1   

const gridSize = document.getElementById("gol-grid-size");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const generate = document.getElementById("gol-generate");
const speed = document.getElementById("speed");
const randomize = document.getElementById("randomize");

let gridSizeN = 7;

let gol = new GameOfLife(100,100);
gol.randomize();
gol.visualize(7);   

generate.addEventListener("click",function(){
    gol.stop();

    let grids = parseInt((canvas.width/gridSize.value)+.5)
    gol = new GameOfLife(grids,grids);

    gol.randomize();
    gol.visualize(gridSize.value);

    gridSizeN = gridSize.value;
});

speed.addEventListener("click",function(){
    gol.start(speed.max-speed.value,gridSizeN);
});

start.addEventListener("click",function(){
    gol.start(speed.max-speed.value,gridSizeN);
});

stop.addEventListener("click",function(){
    gol.stop();
});

randomize.addEventListener("click",function(){
    gol.randomize();
    gol.visualize(gridSizeN);
});

canvas.addEventListener("click",function(evet){
    let rect = canvas.getBoundingClientRect()
    gol.populate(event.clientX-rect.left,event.clientY-rect.top,gridSizeN)
    gol.visualize(gridSizeN);
});

