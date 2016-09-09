goog.provide('bakehard.render.post');

bakehard.render.post.render=function(ctx){
    //string to html
    //clear post area
    //put in area
}

bakehard.render.post.load=function(ctx){
    var post_url=ctx.params.path 

    if(ctx.cache.posts[post_url]){  
        bakehard.render.post.render(ctx.cache.posts[post_url])
    }else{
        jQuery.ajax({   
            url:post_url,
            dataType:"html",
            beforeSend:function(){
                jQuery(document).trigger('post_rendering')
            },
            success:function(response){
                bakehard.render.post.render(response)
                ctx.cache.posts[post_url]=response
            },
            error:function(result){
                jQuery(document).trigger('post_rendered',["fail"])
            }
        }) 
    }
};


