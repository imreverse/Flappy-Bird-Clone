var back, bird, over, f5;
var pipes = [];

function setup()
{
	back = loadImage('images/fbg.png');
	over = loadImage('images/over.png');
	f5 = loadImage('images/f5.png');
	createCanvas(405,720);
	bird = new Bird;
	pipes.push(new Pipe());
}

var touch = false;
var begin = false;
var score = 0;

function draw()
{
	background(back);

	if( begin )
	{
		for(var i=pipes.length-1; i>=0; i--)
		{
			pipes[i].show();
			if( !touch ) pipes[i].update();

			if( pipes[i].hit(bird) || bird.y>=height-fbird.height/10 )
			{
				touch = true;
				image(over,width/2-over.width/8,height/2-2*over.height/4,over.width/4,over.height/4);
			}

			if( pipes[i].offscreen() )
				pipes.splice(i,1);
		}

		if( frameCount%120==0 && !touch )
			pipes.push(new Pipe());

		bird.show();
		bird.update();
	}
	else
		bird.showstart();

	if( touch )
		image(f5,width/2-f5.width/7,height/1.3,f5.width/3.5,f5.height/3.5);
}

function keyPressed()
{
	if( key == ' ' && !touch && begin )
		bird.up();
	if( key == ' ' && !begin )
		begin = true;
}

var value = 0;
function touchStarted()
{
	if( value === 0 && !touch && begin )
		bird.up(), value = 1;
	if( key == ' ' && !begin )
		begin = true, value = 0;
}