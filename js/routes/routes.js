var routes=function(page_render){
    this.current=''
    this.check_and_go=function(){
        
        if( window.location.hash !=this.current){
            page_render(window.location.hash.substring(1))
        }
    }.bind(this)
   
    this.on_change_page=function(e,path){
        
        page_render(path)
        this.current='#'+path
        history.pushState(  null,
                            null,
                            '#'+path)
    }.bind(this)
}

module.exports=routes