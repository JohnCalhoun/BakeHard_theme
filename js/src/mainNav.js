goog.provide('bakehard.mainNav');

goog.require('bakehard.constants');
goog.require('goog.uri.utils');


bakehard.mainNav.navigate=function(e){    
    var link=jQuery(e.target)
    var path_full=link.attr('href')
    var base_url=bakehard.constants.site_url
    
    if(path_full.indexOf(base_url) != -1){
        e.preventDefault()  
        var path=goog.uri.utils.getPath(link.attr('href')) 
        jQuery(window).trigger('change_page',path) 
    }
};

jQuery(document).on('click','.nav,.a',bakehard.mainNav.navigate)
jQuery(document).on('click','.nav,.a',function(e){
    var element=jQuery(e.target).parent()
    var nav=element.parent()

    nav.find('.active').removeClass('active')
    element.addClass('active')
})

