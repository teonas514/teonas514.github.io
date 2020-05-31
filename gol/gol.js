const canvas = document.getElementById('gol-canvas');
const g2d = canvas.getContext('2d');

export default class GameOfLife {

    constructor(columns, rows) {
        this.columns = columns;
        this.rows = rows;

        this.cells = {};
        //populate cells...
        for (let x = 0; x < columns; x++) {
            let cellsY = {};
            for (let y = 0; y < rows; y++) {
                cellsY[y] = false;
            }
            this.cells[x] = cellsY;
        }
    }

    isWall(x, y) {
        if (this.cells[x] !== undefined) {
            if (this.cells[x][y] !== undefined) {
                return false;
            }
        }
        return true;
    }

    isPopulated(x, y) {
        if (this.isWall(x, y)) {
            return false;
        }
        return this.cells[x][y];
    }

    sumOfNeighbours(x, y) {
        let sum = 0;

        sum += this.isPopulated(x + 1, y);
        sum += this.isPopulated(x - 1, y);
        sum += this.isPopulated(x, y + 1);
        sum += this.isPopulated(x, y - 1);

        sum += this.isPopulated(x + 1, y + 1);
        sum += this.isPopulated(x - 1, y + 1);
        sum += this.isPopulated(x + 1, y - 1);
        sum += this.isPopulated(x - 1, y - 1);

        return sum;
    }

    randomize() {
        for (let x = 0; x < this.columns; x++) {
            for (let y = 0; y < this.rows; y++) {
                this.cells[x][y] = Math.random() > .4
            }
        }
    }

    visualize(size) {
        g2d.fillStyle = "#ffffff";
        g2d.fillRect(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < this.columns; x++) {
            for (let y = 0; y < this.rows; y++) {
                if (this.cells[x][y]) {
                    g2d.fillStyle = "#000000";
                    g2d.fillRect(x * size, y * size, size, size);
                }
            }
        }
    }

    start(spd,size) {
        this.stop();
        this.id = setInterval(() => {
            this.update();
            this.visualize(size);
        }, spd);
    }

    populate(x,y,g){
        let xIndex = parseInt(x/g);
        let yIndex = parseInt(y/g);
        if(!this.isWall(xIndex,yIndex))
        {
            this.cells[xIndex][yIndex] = !this.cells[xIndex][yIndex];
        }
    }

    stop() {
        clearInterval(this.id);
    }

    update() {
        let newCells = {};

        for (let x = 0; x < this.columns; x++) {
            
            let cellsY = {}
            for (let y = 0; y < this.rows; y++) {
                cellsY[y] = false
            }
            newCells[x] = cellsY;
        }
        for (let x = 0; x < this.columns; x++) {
            for (let y = 0; y < this.rows; y++) {
                
                if(this.sumOfNeighbours(x,y) == 3)
                {
                    newCells[x][y] = true;
                }
                else if(this.sumOfNeighbours(x,y) >= 4)
                {
                    newCells[x][y] = false;
                }
                else if(this.sumOfNeighbours(x,y) <= 1)
                {
                    newCells[x][y] = false;
                }
                else
                {
                    newCells[x][y] = this.cells[x][y]
                }
            }
        }
        this.cells = newCells;
    }
}