goog.provide('bakehard.scrollLoad');

jQuery(document).scroll(function(){
    var scroll_bottom=jQuery(window).scrollTop()+jQuery(window).height();
    var page_length=jQuery(document).height()-30;
    
    if( scroll_bottom >= page_length){
        jQuery(document).trigger('scrolled2Bottom');
    };
})
