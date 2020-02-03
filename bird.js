var fbird, start, fp;

function preload()
{
    fbird = loadImage('images/fbrd.png');
    start = loadImage('images/start.png');
    fp = loadImage('images/fp.png');
}

function Bird()
{
    this.x = width/2.3;
    this.y = height/2.3;

    this.gravity = 0.8;
    this.lift = -15;
    this.velocity = 0;

    this.showstart = function()
    {
        image(fp, width/2-fp.width/3, height/8, fp.width/1.5, fp.height/1.5);
        image(fbird,this.x,this.y,fbird.width/15,fbird.height/15);
        image(start, width/2-start.width/4, height/1.25, start.width/2, start.height/2);
    }

    this.show = function()
    {
        image(fbird,this.x,this.y,fbird.width/15,fbird.height/15);
    }

    this.up = function()
    {
        this.velocity += this.lift;
    }

    this.update = function()
    {
        // Increase velocity with time
        this.velocity += this.gravity;
        // Some air resistance
        this.velocity *= 0.95;
        // Change bird's y acc to velocity, gradually
        this.y += this.velocity;

        // If the bird has hit the bottom, change it's y coordinate to a constant
        // And set it's velocity to 0, so the bird doesn't move
        if( this.y>height-fbird.height/10 )
            this.y = height-fbird.height/10, this.velocity = 0;
        // Also if the bird goes way to above the screen, constantize the y
        if( this.y<-fbird.height/10 )
            this.y = -fbird.height/10;
    }
}
