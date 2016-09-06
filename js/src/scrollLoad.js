goog.provide('bakehard.scrollLoad');

$(document).scroll(function(){
    var scroll_bottom=$(window).scrollTop()+$(window).height();
    var page_length=$(document).height()-30;
    
    if( scroll_bottom >= page_length){
        $(document).trigger('scrolled2Bottom');
    };
})
