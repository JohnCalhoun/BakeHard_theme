goog.provide('bakehard.routes')

goog.require('bakehard.render.page')
goog.require('goog.uri.utils');

bakehard.routes.current=''
bakehard.routes.check_and_go=function(){
    if( window.location.hash != bakehard.routes.current){
        bakehard.render.page.load(window.location.hash.substring(1))
    }else{
        console.log(2)
    }
}

jQuery(window).on('change_page',function(e,path){
    bakehard.render.page.load(path)
    bakehard.routes.current='#'+path
    history.pushState(  null,
                        null,
                        '#'+path)
})

jQuery(window).on('popstate',bakehard.routes.check_and_go)
jQuery(window).ready(bakehard.routes.check_and_go)
