//let body = document.getElementsByTagName("body");
//body[0].style.backgroundColor = "#0000ff";

import Maze from "./maze.js";

const canvas = document.getElementById('screen');
const g2d = canvas.getContext('2d');

const makeMaze = document.getElementById("makeMaze");
const columns = document.getElementById("columns");
const rows = document.getElementById("rows");

canvas.width = 500;
canvas.height = 500;

let nColumns = 64;
let nRows = 64;


columns.addEventListener("keyup",function(){
  nColumns = columns.value;
});

rows.addEventListener("keyup",function(){
  nRows = rows.value;
});

makeMaze.addEventListener("click",function(){
  g2d.fillStyle = "#ffffff";
  g2d.fillRect(0,0,500,500);

  if(nColumns + nRows > 2)
  {
  let m = new Maze(nColumns,nRows);

m.makeMaze();
m.visualize(10,10,480,480);
  }
});

let m = new Maze(nColumns,nRows);

m.makeMaze();
m.visualize(20,20,460,460);