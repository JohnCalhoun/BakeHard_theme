var routes=function(page_render){
    this.current=''
    var check_and_go=function(){
        
        if( window.location.hash !=this.current){
            page_render(window.location.hash.substring(1))
        }
    }.bind(this)
   
    var on_change_page=function(e,path){
        
        page_render(path)
        this.current='#'+path
        history.pushState(  null,
                            null,
                            '#'+path)
    }.bind(this)
    
    jQuery(window).ready(function(){
        check_and_go()
    
        jQuery(window).on(  'popstate',
                            check_and_go)
       
        jQuery('main').on(  
            'change_page',
            on_change_page
        )
        
    })
   
}

module.exports=routes
