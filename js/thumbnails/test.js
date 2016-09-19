var jQuery=require('jquery-browserify')

var constants={
        api_url:'/thumbnails/data/',
        post_per_page:10
    }

var thumbnail=require('./thumbnails.js')
var template=function(post){
    var out="<div class='thumbnail-card' data-sort='"
            +Math.random() 
            +"' >"
            +post.title.rendered+"</div>"
    return(out)
}

window.thumbnails_test=new thumbnail(constants,template)

jQuery(window).ready(
    function(){
        window.thumbnails_test.IsotopeInit()
    }
)

