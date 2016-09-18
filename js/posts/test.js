var jQuery=require('jquery-browserify')

var constants={
        api_url:'/posts/data/',
        post_per_page:10
    }

var posts=require('./posts.js')
var template=function(post){
    var out="<div class='thumbnail-card' >"+post.title.rendered+"</div>"
    return(out)
}

window.posts_test=new posts(constants,template)

jQuery(window).ready(
    function(){
        window.posts_test.IsotopeInit()
    }
)

