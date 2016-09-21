var navigate=function(constants){
    var out=function(e){    
        var path=jQuery(e.target).attr('href')
        
        if(path.indexOf(constants.site_url) != -1){
            e.preventDefault()  
            jQuery('main').trigger('change_page',path) 
        }
    } 
    return(out)
}
module.exports=navigate
