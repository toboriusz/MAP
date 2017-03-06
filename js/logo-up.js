module.exports = function(){
	var sectionsIds = [];

    $('section[animate-logo]').each(function(){
      var $el = $(this);
      sectionsIds.push({
        id: $el,
        item: $($el)
      });
    });

    var sizes = [], recountSizes = function(){
      sizes = [];
      $.each(sectionsIds, function(i, el){
        var $el = $(el.id);
        el.top = $el.offset().top;
        el.bottom = $el.offset().top + $el.outerHeight(); 
        sizes.push(el);
      });
    };

    function watch(){
      var scroll = window.scrollY + 20;
      $.each(sizes, function(i, el){
        if(el.top <= scroll && el.bottom > scroll){
          el.item.addClass('logo-up');
        }else{
          el.item.removeClass('logo-up');
        }
      });
    }

    $(document).on('ready', function(){
      recountSizes();
    });

    $(window).on({
      resize: recountSizes,
      scroll: watch
    });
}