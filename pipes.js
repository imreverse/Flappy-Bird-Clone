function Pipe()
{
    this.top = random(0,height/2);
    this.bottom = 200 + this.top;
    this.x = width;
    this.w = 60;
    this.speed = 2;
    this.touch = false;

    this.hit = function(bird)
    {
        if( ( bird.y <= this.top || bird.y+(fbird.height)/15 >= this.bottom ) && bird.x>this.x && bird.x<this.x+this.w )
            return true, this.touch = true;
        else
            return false;
    }
    
    this.show = function()
    {
        fill(0,200,0);
        if( this.touch )
            fill(200,0,0);
        rect(this.x, 0, this.w, this.top, 1);
        rect(this.x, this.bottom, this.w, height-this.bottom, 1);
    }
    
    this.update = function()
    {
            this.x -= this.speed;
    }

    this.offscreen = function()
    {
        if( this.x < -this.w )
            return true;
        else
            return false;
    }
}