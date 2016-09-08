goog.provide('bakehard.navigation');

goog.require('bakehard.pageLoad');
goog.require('goog.uri.utils');

bakehard.navigation.navigate=function(e){    
    var link=$(e.target)
    var path=link.attr('href')
    
    var nav=link.parents('.nav') 
    var target_id=nav.attr('data-target-window')
    var source_id=nav.attr('data-source-window')
    var base_url=nav.attr('data-local-url')
   
    if(path.indexOf(base_url) != -1){
        e.preventDefault() 
        bakehard.pageLoad.swap(path,source_id,target_id)

        var hash='#'+goog.uri.utils.getPath(path)
        history.pushState(null,null,hash) 
    }
};
jQuery(document).on('click','.nav,.a',bakehard.navigation.navigate)
