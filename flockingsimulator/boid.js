const canvas = document.getElementById('flocking-canvas');
const g2d = canvas.getContext('2d');

export default class Boid
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;

        this.velocity = 1;
        this.angel = Math.random() * 2 * Math.PI;
        this.desiredAngel = this.angel;
        this.angularVelocity = Math.PI/10;
    }

    steer()
    {
        if(Math.abs(this.angel-this.desiredAngel) <= this.angularVelocity)
        {
            this.angel = this.desiredAngel;
        }
        else if(this.angel > this.desiredAngel)
        {
            this.angel -= this.angularVelocity;
        }
        else
        {
            this.angel += this.angularVelocity;
        }
    }
    
    lerp(a,b,t)
    {
        return a+(b-a)*t;
    }

    update(flock)
    {
        this.steer();
        let sum = 0;
        let total = 0;
        let vision = 50;
        this.desiredAngel = 0
        for(let i = 0; i < flock.length; i++)
        {
            let item = flock[i]
            let deltaX = Math.abs(item.x-this.x);
            let deltaY = Math.abs(item.y-this.y);
            
            let distance = Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2));
            
            if(distance < vision)
            {
                this.desiredAngel += item.angel
            }
        }

        this.desiredAngel /= flock.length
        this.desiredAngel += Math.random()/10;
        this.x += Math.cos(this.angel) * this.velocity;
        this.y += Math.sin(this.angel) * this.velocity;
        if(this.x < 0) this.x = 500;
        if(this.x > 500) this.x = 0;
        if(this.y < 0) this.y = 500;
        if(this.y > 500) this.y = 0;
    }

    display()
    {
        let right = this.angel - Math.PI/2;
        let left = this.angel + Math.PI/2;
        let size = 3;
        g2d.fillStyle = '#000000';
        g2d.fill();
        g2d.beginPath();
        g2d.moveTo(Math.cos(right)*size+this.x, Math.sin(right)*size+this.y);
        g2d.lineTo(Math.cos(this.angel)*size*3+this.x, Math.sin(this.angel)*size*3+this.y);
        g2d.lineTo(Math.cos(left)*size+this.x, Math.sin(left)*size+this.y);
        g2d.lineTo(Math.cos(this.angel)*size*.5+this.x, Math.sin(this.angel)*size*.5+this.y);
        g2d.closePath();
    }
}