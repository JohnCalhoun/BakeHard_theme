goog.provide('bakehard.scrollLoad');
goog.require('bakehard.routes');

bakehard.scrollLoad.check=function(){
    var scroll_bottom=jQuery(window).scrollTop()+jQuery(window).height();
    var page_length=jQuery(document).height()-30;
    
    if( scroll_bottom >= page_length){
        jQuery(document).trigger('scrolled2Bottom');
    };
}

jQuery(document).scroll(bakehard.scrollLoad.check)
jQuery(document).on('page_rendered',bakehard.scrollLoad.check)
