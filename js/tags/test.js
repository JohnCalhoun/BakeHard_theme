var jQuery=require('jquery-browserify')

var constants={
        api_url:'/tags/data/',
    }

var tags=require('./tags.js')
var template=function(post){
    var out="<div class='tag'>tag</div>"
    return(out)
}

jQuery(window).ready(
    window.tags_test=new tags(constants,template,'.tags')
)

