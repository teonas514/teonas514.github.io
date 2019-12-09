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

const checkBox = document.getElementById("stretchToFit");

const warningText = document.getElementById("warningText");

function checkWarn(){
  if(columns.value * rows.value > 40000)
  {
    warningText.style.visibility = "visible";
  }
  else{
    console.log("yes!");
    warningText.style.visibility = "hidden";
  }
}

checkWarn();
checkBox.addEventListener("click",function(){
  if (checkBox.checked){
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

async function test(m)
{
  m.makeMaze();
  return "BAJS";
}

function runMaze(m)
{
  return new Promise(resolve=>{
    
    m.makeMaze();

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
    
    let m = new Maze(columns.value,rows.value);
    let result = await runMaze(m);

    let gsx = 0;
    let gsy = 0;
    
    if(checkBox.checked)
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

    let posX = (canvas.width - gsx*m.rows)/2;
    let posY = (canvas.height - gsy*m.columns)/2;

    m.visualize(posX,posY,gsx,gsy);
}

makeMaze.addEventListener("click",generate);