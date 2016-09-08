goog.provide('bakehard.navigate');

goog.require('bakehard.routes');
goog.require('bakehard.pageLoad');
goog.require('goog.uri.utils');

bakehard.navigate.navigate=function(e){    
    var link=$(e.target)
    var path=link.attr('href')
    
    var nav=link.parents('.nav') 
    var target_id=nav.attr('data-target-window')
    var source_id=nav.attr('data-source-window')
    var base_url=nav.attr('data-local-url')
   
    if(path.indexOf(base_url) != -1){
        e.preventDefault()  
        page("/page/"+target_id+"/"+source_id+"/"+path)
    }
};
jQuery(document).on('click','.nav,.a',bakehard.navigate.navigate)
