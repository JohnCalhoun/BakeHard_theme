var progress={}

progress.start=function(id,selector,template){
    return(function(e,cached){
        var screen=jQuery(id)
        if( screen.length ==0 ){
            jQuery(selector).append(
                template()
                )
            )
        }
        screen.show()
    })
}

progress.progress=function(id){
    return( function(e,progress){
    })
}

progress.stop=function(id){
    return(function(){
        jQuery(id).hide()
    })
}


module.exports=function(vars){}

