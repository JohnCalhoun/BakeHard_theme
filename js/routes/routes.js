module.exports=function(vars){
goog.provide('bh.routes')

goog.require('bh.render.load')
goog.require('goog.uri.utils');

bh.routes.current=''
bh.routes.check_and_go=function(){
    if( window.location.hash != bh.routes.current){
        bh.render.load.load(window.location.hash.substring(1))
    }
}

jQuery(window).on('change_page',function(e,path){
    bh.render.page.load(path)
    bh.routes.current='#'+path
    history.pushState(  null,
                        null,
                        '#'+path)
})

jQuery(window).on('popstate',bh.routes.check_and_go)
jQuery(window).ready(bh.routes.check_and_go)

}
