module.exports = function(){

  function a_scroll(){
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      $('html,body').stop();
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  }

  $(function(){
    setTimeout(function(){
      if(window.location.hash){
        var hash = window.location.hash
        $('#menu-header-menu a[href="'+ hash +'"]').click();
      }
    },100)

    $('[href*="#"]:not([href="#"], [data-toggle])').click(a_scroll);

    $('body').bind('mousewheel', function() {
      $('html,body').stop();
    });

    var sectionsIds = [];

    $('#navigation li').each(function(){
      var $el = $(this);
      sectionsIds.push({
        id: $el.find('a').attr('href'),
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
      var scroll = window.scrollY + (window.screen.availHeight / 2);
      $.each(sizes, function(i, el){
        if(el.top <= scroll && el.bottom > scroll){
          el.item.addClass('active');

          if(window.location.hash !== el.id){
            history.replaceState(null, null, el.id);
          }
        }else{
          el.item.removeClass('active');
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
    $('#menu a').on({
      click: recountSizes
    });
  });
}