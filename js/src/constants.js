goog.provide('bakehard.constants')

bakehard.constants.base_url=""
bakehard.constants.api_url=""
bakehard.constants.post_per_page=10

jQuery(document).ready(function(){
    bakehard.constants.base_url=jQuery( 'link[rel="https://api.w.org/"]' ).attr('href')
    bakehard.constants.api_url=bakehard.constants.base_url+"wp/v2/"
})
