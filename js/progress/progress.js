module.exports=function(vars){
goog.provide('bh.progress')

bh.progress.start=function(id,selector,template){
    return(function(e,cached){
        var screen=jQuery(id)
        if( screen.length ==0 ){
            jQuery(selector).append(
                soy.renderAsFragment(
                    template,
                    {}
                )
            )
        }
        screen.show()
    })
}

bh.progress.progress=function(id){
    return( function(e,progress){
    })
}

bh.progress.stop=function(id){
    return(function(){
        jQuery(id).hide()
    })
}


}
