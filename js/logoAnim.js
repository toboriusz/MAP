module.exports = function(){
	
	var speed = 100;
	var current = 1;

	setInterval(function(){
		if(current === 1) current = 0;
		else current = 1;
		$('section#map .logo img:first-of-type').css("z-index", current);
	}, speed);
}