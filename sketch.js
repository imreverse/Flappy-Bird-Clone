var back, bird, over, f5;
var pipes = [];

// For the sound-based game
var mic;

function setup()
{
	back = loadImage('images/fbg.png');
	over = loadImage('images/over.png');
	f5 = loadImage('images/f5.png');
    // p5.AudioIn() gives access to the mic
    // and provides various functions
    mic = new p5.AudioIn;
    mic.start();

	createCanvas(405,720);
	bird = new Bird();
	// pipes.push(new Pipe());
}

var touch = false; // Check if the bird has touched a pipe or not
var begin = false; // Check if the game has begun, and start sending pipes
// var score = 0; // Implement a score function as bird passes through pipes

function draw()
{
    // Always display the background
	background(back);

    // Get the current audio level
    var vol = mic.getLevel();
    // console.log(vol);

    // Bangity Bird
    if( vol>=0.15 && frameCount%10==0 ) begin = true, bird.up();

	if( begin )
	{
		for(var i=pipes.length-1; i>=0; i--)
		{
            // Always show the pipes
			pipes[i].show();
            // Update, ie move the pipes to the left,
            // until the game is over, ie !touch
			if( !touch ) pipes[i].update();

            // Check if the bird has it this pipe, or it has fallen to the ground
			if( pipes[i].hit(bird) || bird.y>=height-fbird.height/10 )
                touch = true;

            // Check if a pipe is offscreen, ie it's x coordinate is less than 0
            // If it is so, pop_front() from the pipes array, in order to 
            // reduce time complexity and space complexity
			if( pipes[i].offscreen() )
				pipes.splice(i,1);
		}

        // This controls when a pipe needs to be pushed
        // We've to push until the game is over, ie !touch
		if( frameCount%120==0 && !touch )
			pipes.push(new Pipe());

        // Always show and update the bird
		bird.show();
        // If the game is over, change bird's velocity to zero
		bird.update();
	}
	else
		bird.showstart();

    // If bird has touched, ie the game is over,
    // Display Game Over and Reload images
	if( touch )
    {
        image(over,width/2-over.width/8,height/2-2*over.height/4,over.width/4,over.height/4);
        image(f5,width/2-f5.width/7,height/1.3,f5.width/3.5,f5.height/3.5);
    }
}

function keyPressed()
{
    // If the game has started, and isn't over yet
    // So if the user enters space bar, upthrust the bird
	if( key == ' ' && !touch && begin )
		bird.up();

    // If game hasn't started, and user enters space bar
    // Start the game by changing begin state
	if( key == ' ' && !begin )
		begin = true;
}
