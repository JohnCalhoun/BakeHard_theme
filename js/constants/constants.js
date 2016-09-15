module.exports=function(vars){

post_per_page=10

api_site_url=function(){
    return(bh_api_url+'site_url')
}

init=function(){
    base_url   =jQuery( 'link[rel="https://api.w.org/"]' ).attr('href')
    api_url    =base_url+"wp/v2/"
    bh_api_url =base_url+"bh/v1/"
    
    jQuery.ajax({
            url:api_site_url(),
            success:function(url){
                site_url=url+'/'
                jQuery(window).trigger('site_url_found')
            }
    })
}

}
