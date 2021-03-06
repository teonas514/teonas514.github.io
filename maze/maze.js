import Math2 from "./math.js";
const canvas = document.getElementById('maze-canvas');
const g2d = canvas.getContext('2d');

export default class Maze{
    
    constructor(c,r)
    {
      this.columns = c;
      this.rows = r;
      
      this.cells = [];
      
      for(let y = 0; y<this.rows; y++)
      {
        let cellsY = [];
        for(let x = 0; x<this.columns; x++)
        {
          let cellsX = [false,false,false,false];
          cellsY.push(cellsX);
        }
        this.cells.push(cellsY);
      }
    }
    
    isWall(x,y)
    {
      if(this.cells[x] === undefined)
      {
        return true;
      }
      else if(this.cells[x][y] === undefined)
      {
        return true;
      }
      return false;
    }
    
    isVisited(x,y)
    {
      let cell = this.cells[x][y];
  
      for(let i = 0; i<= 3; i++)
      {
  
        if(cell[i])
        {
          return true;
        }
      }
      return false;    
    }
    
    invertDirection(dir)
    {
      switch(dir)
      {
        case 0:
          dir = 3;
          break;
        case 1:
          dir = 2;
          break;
        case 2:
          dir = 1;
          break;
        case 3:
          dir = 0;
          break;
      }
      return dir;
    }
    
    directionToPosition(x,y,dir)
    {
      let newX = x;
      let newY = y;
      switch(dir)
      { 
        case 0:
          newY++;
          break;
        case 1:
          newX++;
          break;
        case 2:
          newX--;
          break;
        case 3:
          newY--;
          break;
      }
      return [newX,newY];
    }
    
    isStuck(x,y)
    {
      for(let i = 0; i <= 3; i++)
      {
        let newX = this.directionToPosition(x,y,i)[0];
        let newY = this.directionToPosition(x,y,i)[1];
        if(this.canGoTo(newX,newY))
        {
          return false;
        }
      }
      return true;
    }
    
    canGoTo(x,y){
      if(this.isWall(x,y))
      {
        return false;
      }
      if(this.isVisited(x,y))
      {
        return false;
      }
      return true;
    }
    
    digFrom(x,y,dir)
    {
      this.cells[x][y][dir] = true;
      
      let newPos = this.directionToPosition(x,y,dir);
      
      let newX = newPos[0];
      let newY = newPos[1];
      let newDir = this.invertDirection(dir);
      
      //("digged to: "+newX,newY);
      
      this.cells[newX][newY][newDir] = true;
        
      return [newX,newY];ss
    }
    
    getRandomNeighbour(x,y,d)
    {
      return [newX,newY];
    }
    
    digFromRandom(x,y)
    {
      
      //("im at: "+ x,y);
      if(this.isStuck(x,y))
      {
        //("got stuck");
        return null;
      }
      
      let dir = Math2.random(0,3);
      
      let newPos = this.directionToPosition(x,y,dir);
      
      let newX = newPos[0];
      let newY = newPos[1];
      
      while(!this.canGoTo(newX,newY))
      {
        dir = Math2.random(0,3);
        
        newPos = this.directionToPosition(x,y,dir);
        
        newX = newPos[0];
        newY = newPos[1];
      }
      
      //("dir: "+ dir);
  
      let nextPos = this.digFrom(x,y,dir);
      
      
      return nextPos;
    }
    
    makeArm(x,y)
    {
      let posX = x,posY = y;
      while(true)
      {
        let nextPos = this.digFromRandom(posX,posY);
        if(nextPos === null)
        {
          return;
        }
        posX = nextPos[0];
        posY = nextPos[1];
      }
    }                   
    
    getLowestCell()
    {
      for(let y = 0; y<this.columns; y++)
      {
        for(let x = 0; x<this.rows; x++)
        {
          if(!this.isVisited(x,y))
          {
            return [x,y];
          }
        }
      }
      return null;
    }
    
    
    generate(posX,posY,gsx,gsy,visualize)
    {
      this.makeArm(0,0);

      this.id = setInterval(()=>{
        //("newArm");
        
        let lowest = this.getLowestCell(); 
        
        if(lowest === null)
        {
          this.cells[0][0][3] = true;
          this.cells[this.rows-1][this.columns-1][0] = true;
          this.visualize(posX,posY,gsx,gsy);
          clearInterval(this.id);
        }
        else
        {
          if(visualize){this.visualize(posX,posY,gsx,gsy);}
          this.connect(lowest[0],lowest[1]);
          this.makeArm(lowest[0],lowest[1]);
        }
      }, 0);

      //[0] = true;
      return Promise.resolve(1);
    }
    
    connect(x,y)
    {
      //("connecting..");
      let dir = Math2.random(0,3);
      
      let newPos = this.directionToPosition(x,y,dir);
        
      let newX = newPos[0];
      let newY = newPos[1];
      
      while(true)
      {
        dir = Math2.random(0,3);
        
        newPos = this.directionToPosition(x,y,dir);
        
        newX = newPos[0];
        newY = newPos[1];
        //(newX,newY);
        if(!this.isWall(newX,newY))
        {
          //("no wall");
          if(this.isVisited(newX,newY))
          {
            //("visited");
            break;
          }
        }
      }
      let nextPos = this.digFrom(x,y,dir);
    }
    clear()
    {
      if(this.id)
      {
        clearInterval(this.id);
      }
      g2d.fillStyle = "#ffffff";
      g2d.fillRect(0,0,canvas.width,canvas.height);

    }
    visualize(posX,posY,gsx,gsy)
    {
      gsx = parseInt(gsx);
      gsy = parseInt(gsy);

      g2d.fillStyle = "#ffffff";
      g2d.fillRect(0,0,canvas.width,canvas.height);
    
      for(let y = 0; y<this.columns; y++)
      {
        for(let x = 0; x<this.rows; x++)
        {
          for(let i = 0; i <= 3; i++)
          {
            if(!this.cells[x][y][i])
            {
            //g2d.globalAlpha = 0;
              g2d.lineCap = "round";
              g2d.strokeStyle = "#111111";
              g2d.beginPath();
              
              let offsetX = x*gsx+posX; 
              let offsetY = y*gsy+posY;
              
              switch(i)
              {
                case 0: //roof
                  g2d.moveTo(offsetX,offsetY+gsy);
                  g2d.lineTo(offsetX+gsx,offsetY+gsy);
                  break;
                case 1: //side
                  g2d.moveTo(offsetX+gsx,offsetY);
                  g2d.lineTo(offsetX+gsx,offsetY+gsy);
                  break;
                case 2:
                  g2d.moveTo(offsetX,offsetY);
                  g2d.lineTo(offsetX,offsetY+gsy);
                  break;
                case 3:
                  g2d.moveTo(offsetX,offsetY);
                  g2d.lineTo(offsetX+gsx,offsetY);
                  break;
              }
              g2d.stroke();
            }
          }
        }
      }
    }
  }
  