goog.provide('bakehard.constants')

bakehard.constants.base_url=""
bakehard.constants.api_url=""
bakehard.constants.site_url=""
bakehard.constants.post_per_page=10

jQuery(document).ready(function(){
    bakehard.constants.base_url=jQuery( 'link[rel="https://api.w.org/"]' ).attr('href')
    bakehard.constants.api_url=bakehard.constants.base_url+"wp/v2/"
    bakehard.constants.bh_api_url=bakehard.constants.base_url+"bakehard/v1/"
    
    jQuery.ajax({
            url:bakehard.constants.bh_api_url+'site_url',
            success:function(url){
                bakehard.constants.site_url=url+'/'
            }
    })

})
