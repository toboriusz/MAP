module.exports = function(){
	var sectionsIds = [];

    $('section').each(function(){
      var $el = $(this);
      sectionsIds.push({
        id: $el,
        item: $($el).find('.animated-logo')
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
          el.item.addClass('up');
        }else{
          el.item.removeClass('up');
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