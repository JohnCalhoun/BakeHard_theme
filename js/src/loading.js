goog.provide('bakehard.loading')
goog.require('bakehard.templates')

bakehard.loading.start=function(id,selector,template){
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

bakehard.loading.progress=function(id){
    return( function(e,progress){
    })
}

bakehard.loading.stop=function(id){
    return(function(){
        jQuery(id).hide()
    })
}



