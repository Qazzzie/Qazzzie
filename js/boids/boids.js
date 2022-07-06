// Javascript implementation of Boids
// Requires http://raphaeljs.com/raphael.js
// Ben Dowling - Oct 2008
// www.coderholic.com

var Boid = function(x, y, size) {
	this.x = x;
	this.y = y;

	this.xVelocity = 1;
	this.yVelocity = -1;

	this.circle = paper.circle(x, y, size).attr({fill: '#FF0000'});
}

Boid.prototype.move = function() {
	// Raphaël JS doesn't provide any way to GET the position once 
	// we've moved it so we'll need to manually track the position
	this.x += this.xVelocity;
	this.y += this.yVelocity;
	var border = 5;
	if(this.x <= border || this.x >= width - border) {
		this.x -= this.xVelocity;					
		this.x = Math.max(this.x, border);
		this.x = Math.min(this.x, width - border);
		this.xVelocity = -this.xVelocity;
		this.x += this.xVelocity;
	}
	if(this.y <= border || this.y >= height - border) {
		this.y -= this.yVelocity;
		this.y = Math.max(this.y, border);
		this.y = Math.min(this.y, height - border);
		this.yVelocity = -this.yVelocity;
		this.y += this.yVelocity;
	}
	this.circle.translate(this.xVelocity, this.yVelocity);
}
	
Boid.prototype.distance = function(boid) {
    var distX = this.x - boid.x;
	var distY = this.y - boid.y;
	return Math.sqrt(distX * distX + distY * distY);
}
	
Boid.prototype.moveAway = function(boids, minDistance) {
	var distanceX = 0;
	var distanceY = 0;
	var numClose = 0;

	for(var i = 0; i < boids.length; i++) {
		var boid = boids[i];
		
		if(boid.x == this.x && boid.y == this.y) continue;
		
		var distance = this.distance(boid)
		if(distance < minDistance) {
			numClose++;
			var xdiff = (this.x - boid.x);
			var ydiff = (this.y - boid.y);

			if(xdiff >= 0) xdiff = Math.sqrt(minDistance) - xdiff;
			else if(xdiff < 0) xdiff = -Math.sqrt(minDistance) - xdiff;

			if(ydiff >= 0) ydiff = Math.sqrt(minDistance) - ydiff;
			else if(ydiff < 0) ydiff = -Math.sqrt(minDistance) - ydiff;

			distanceX += xdiff;
			distanceY += ydiff;
			boid = null; 
		}
	}
	
	if(numClose == 0) return;
	
	this.xVelocity -= distanceX / 5;
	this.yVelocity -= distanceY / 5;
}
	
Boid.prototype.moveCloser = function(boids, distance) {
    if(boids.length < 1) return				

	var avgX = 0;
	var avgY = 0;
	for(var i = 0; i < boids.length; i++) {
		var boid = boids[i];
		if(boid.x == this.x && boid.y == this.y) continue;
		if(this.distance(boid) > distance) continue;
		
		avgX += (this.x - boid.x);
		avgY += (this.y - boid.y);
		boid = null;
	}
		

	avgX /= boids.length;
	avgY /= boids.length;

	distance = Math.sqrt((avgX * avgX) + (avgY * avgY)) * -1.0
	if(distance == 0) return;
	
	this.xVelocity= Math.min(this.xVelocity + (avgX / distance) * 0.15, maxVelocity)
	this.yVelocity = Math.min(this.yVelocity + (avgY / distance) * 0.15, maxVelocity)
}
	
Boid.prototype.moveWith = function(boids, distance) {
    if(boids.length < 1) return

	// calculate the average velocity of the other boids
	var avgX = 0;
	var avgY = 0;
	for(var i = 0; i < boids.length; i++) {
		var boid = boids[i];
		if(boid.x == this.x && boid.y == this.y) continue;
		if(this.distance(boid) > distance) continue;
		
		avgX += boid.xVelocity;
		avgY += boid.yVelocity;
		boid = null;
	}
	avgX /= boids.length;
	avgY /= boids.length;

	distance = Math.sqrt((avgX * avgX) + (avgY * avgY)) * 1.0
	if(distance == 0) return;

	this.xVelocity= Math.min(this.xVelocity + (avgX / distance) * 0.05, maxVelocity)
	this.yVelocity = Math.min(this.yVelocity + (avgY / distance) * 0.05, maxVelocity)						
}

var random = function(maxNum) {
	return Math.ceil(Math.random() * maxNum);
}

// Insert all the boid stuff onto the page and 
// set it all up
window.onload = function () {
	width = 600;//window.innerWidth || document.body.clientWidth;
	height = 400;//window.innerHeight || document.body.clientHeight;
	var stop = false;
	
	maxVelocity = 5;

	var elem = document.getElementById("boids");
	if(!elem) {
		alert("Boids requires an element with id 'boids'");
		return;
	}

	elem.innerHTML = "<div id='boids-canvas' style='margin: auto;  width:" + width + "px; height:" + height + "px;'></div>";

    paper = Raphael("boids-canvas", width, height);

	var boids = [];
	var numBoids = 20;
	for(var i = 0; i < numBoids; i++) {
		boids.push(new Boid(random(width), random(height), 5));
	}

	function moveBoids() {
		for(var i = 0; i < numBoids; i++) {
			boids[i].moveWith(boids, 300);
			boids[i].moveCloser(boids, 300);					
			boids[i].moveAway(boids, 15);	
		}
	
		
		for(var i = 0; i < numBoids; i++) {
			boids[i].move();
		}
		if(!stop) setTimeout(arguments.callee, 50);
	};			
	
	moveBoids();
	
	var stopButton = document.getElementById('boids-stop');
	stopButton.onclick = function() { 
		stop = !stop;
		if(stop) stopButton.innerHTML = "Start";
		else {
			moveBoids();
			stopButton.innerHTML = "Stop";				
		}
	}			
};
