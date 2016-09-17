var navigate=function(constants){
    var out=function(e){    
        var path=jQuery(e.target).attr('href')
        
        if(path.indexOf(constants.base_url) != -1){
            e.preventDefault()  
            jQuery(window).trigger('change_page',path) 
        }
    } 
    return(out)
}
module.exports=navigate
