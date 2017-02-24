module.exports = function(){
	$('.toggle-menu').click(function(){
		$($(this).attr('data-target')).toggleClass('opened');
	});
}