//let body = document.getElementsByTagName("body");
//body[0].style.backgroundColor = "#0000ff";

import Maze from "./maze.js";

const canvas = document.getElementById('maze-canvas');

canvas.width = 700;
canvas.height = 700;

const g2d = canvas.getContext('2d');
g2d.globalAlpha = 1   
const generateButton = document.getElementById("maze-generate");
const columns = document.getElementById("columns");
const rows = document.getElementById("rows");

const gridSize = document.getElementById("maze-grid-size");
const width = document.getElementById("box-width");
const height = document.getElementById("box-height");

const gridSettings = document.getElementById("grid-settings");
const boxSettings = document.getElementById("box-settings");

const stretchToFit = document.getElementById("stretch-to-fit");

const warningText = document.getElementById("warning-text");

const visualize = document.getElementById("visualize");

g2d.fillStyle = "#ffffff";
g2d.fillRect(0,0,canvas.width,canvas.height);

function UpdateStretchToFitSettings() {
  if (stretchToFit.checked){
    gridSettings.style.display = "none";
    boxSettings.style.display = "block";
  }
  else{
    gridSettings.style.display = "block";
    boxSettings.style.display = "none";
  }  
}
UpdateStretchToFitSettings()
stretchToFit.addEventListener("click",UpdateStretchToFitSettings);

// columns.addEventListener("keyup",checkWarn);
// rows.addEventListener("keyup",checkWarn);
// visualize.addEventListener("change",checkWarn);

function runMaze(m,posX,posY,gsx,gsy)
{
  return new Promise(resolve=>{
    
    maze.generate(posX,posY,gsx,gsy,visualize.checked);

    resolve('resolve');
  });
}

let maze = new Maze(49,49);
//runMaze(maze,5,5,10,10);

async function generate()
{
  maze.clear();
  if(columns.value + rows.value <= 2)
  {
    return;
  }
    
  let gsx = 0;
  let gsy = 0;
  
  if(stretchToFit.checked)
  {
    gsx = width.value/maze.rows;
    gsy = height.value/maze.columns;
  }
  else{
    gsx = gridSize.value;
    gsy = gridSize.value;
  }
  gsy = parseFloat(gsy);
  gsx = parseFloat(gsx);

  maze = new Maze(columns.value,rows.value);
  
  let posX = (canvas.width - gsx*maze.rows)/2;
  let posY = (canvas.height - gsy*maze.columns)/2;
  
  let result = await runMaze(maze,posX,posY,gsx,gsy);
}

generateButton.addEventListener("click",generate);