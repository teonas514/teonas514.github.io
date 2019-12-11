//let body = document.getElementsByTagName("body");
//body[0].style.backgroundColor = "#0000ff";

import Maze from "./maze.js";

const canvas = document.getElementById('screen');

canvas.width = 500;
canvas.height = 500;

const g2d = canvas.getContext('2d');

const makeMaze = document.getElementById("makeMaze");
const columns = document.getElementById("columns");
const rows = document.getElementById("rows");

const gridSize = document.getElementById("gridSize");
const width = document.getElementById("boxWidth");
const height = document.getElementById("boxHeight");

const gridSettings = document.getElementById("gridSettings");
const boxSettings = document.getElementById("boxSettings");

const stretchToFit = document.getElementById("stretchToFit");

const warningText = document.getElementById("warningText");
//const warningSound = new Audio();
const visualize = document.getElementById("visualize");
const alarm = new Audio('assets/audios/critical_error.wav');
alarm.volume = .05;
function checkWarn(){
  if((columns.value * rows.value > 40000) && !visualize.checked)
  {
    alarm.play();
    warningText.style.visibility = "visible";
  }
  else{
    warningText.style.visibility = "hidden";
  }
}

warningText.addEventListener("animationiteration",function(){
  alarm.pause();
  alarm.currentTime = 0;
  if (warningText.style.visibility == "visible")
  {
    alarm.play();
  }
});

checkWarn();
stretchToFit.addEventListener("click",function(){
  if (stretchToFit.checked){
    gridSettings.style.display = "none";
    boxSettings.style.display = "block";
  }
  else{
    gridSettings.style.display = "block";
    boxSettings.style.display = "none";
  }  
});

columns.addEventListener("keyup",checkWarn);
rows.addEventListener("keyup",checkWarn);
visualize.addEventListener("change",checkWarn);

function runMaze(m,posX,posY,gsx,gsy)
{
  return new Promise(resolve=>{
    
    m.makeMaze(posX,posY,gsx,gsy,visualize.checked);

    resolve('resolve');
  });
}

async function generate()
{
  g2d.fillStyle = "#ffffff";
  g2d.fillRect(0,0,500,500);

  if(columns.value + rows.value <= 2)
  {
    return;
  }
    
    let gsx = 0;
    let gsy = 0;
    
    if(stretchToFit.checked)
    {
      gsx = width.value/m.rows;
      gsy = height.value/m.columns;
    }
    else{
      gsx = gridSize.value;
      gsy = gridSize.value;
    }
    gsy = parseFloat(gsy);
    gsx = parseFloat(gsx);

    let m = new Maze(columns.value,rows.value);
    
    let posX = (canvas.width - gsx*m.rows)/2;
    let posY = (canvas.height - gsy*m.columns)/2;
    
    let result = await runMaze(m,posX,posY,gsx,gsy);
}

makeMaze.addEventListener("click",generate);