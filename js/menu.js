module.exports = function(){
	$(function() {

		var $el, leftPos, newWidth,
		$mainNav = $("#navigation");

		$mainNav.append("<li id='magic-line'></li>");
		var $magicLine = $("#magic-line");

		$magicLine
		.width($(".active").width())
		.css("left", $(".active a").position().left)
		.data("origLeft", $magicLine.position().left)
		.data("origWidth", $magicLine.width());

		$("#navigation li a").hover(function() {
			$el = $(this);
			leftPos = $el.position().left;
			newWidth = $el.parent().width();
			$magicLine.stop().animate({
				left: leftPos,
				width: newWidth
			});
		}, function() {
			$magicLine.stop().animate({
				left: $magicLine.data("origLeft"),
				width: $magicLine.data("origWidth")
			});    
		});
		

		$(document).click(function(event) {
			if (!$(event.target).closest(".menu-collapse").length) {
				$('#navigation, .menu-collapse').removeClass('open');
			}
		});

		$('.menu-collapse, #navigation a').click(function(){
			$('#navigation, .menu-collapse').toggleClass('open');
		});

		$(window).resize(function(){
			$('#navigation, .menu-collapse').removeClass('open');
		});

	});
}