goog.provide('bakehard.render.thumbnail');

goog.require('bakehard.templates');
goog.require('bakehard.constants');
goog.require('goog.net.XhrIo');
goog.require('goog.net.XhrIoPool');
goog.require('goog.net.EventType');
goog.require('goog.events');
goog.require('goog.Uri');

jQuery(window).load(function(){ 
    jQuery(document).trigger('new_page') 
})

jQuery(window).on(
    'new_page',
    function(){
        jQuery(".grid").isotope({
            itemSelector:".card",
            masonry:{
                columnWidth:200
            }
        });
    }
)

bakehard.render.thumbnail.current_page=0
bakehard.render.thumbnail.api_post_url=bakehard.constants.api_url+"posts"

bakehard.render.thumbnail.render=function(posts,ctx){ 
    jQuery.each(    
        posts,
        function(index,post){
            ctx.cache.posts[post['link']]=post
            jQuery(".grid").isotope(
                    'insert', 
                    soy.renderAsFragment(
                        bakehard.templates.thumbnail,
                        post
                    ) 
            );  
        }
    )
    jQuery(document).trigger('thumbnail_rendered',["success"])
}

bakehard.render.thumbnail.load=function(ctx){
    var api_url=bakehard.render.thumbnail.api_post_url
    var page=ctx.params.page

    var request_url=api_url+"?/page="+page+"&per_page"+bakehard.constants.post_per_page
    
    if(ctx.cache.posts_page[page]){  
        bakehard.render.thumbnail.render(ctx.state.posts_page[page])
    }else{
        jQuery.ajax({   
            url:request_url,
            dataType:"json",
            xhr:function(){
                var xhr= new window.XMLHttpRequest(); 
                jQuery(document).trigger('thumbnail_progress',{"percent":0})
                xhr.addEventListener(
                "progress", 
                function(evt){
                    if (evt.lengthComputable) {  
                        var percentComplete = evt.loaded / evt.total;
                        jQuery(document).trigger('thumbnail_progress',{"percent":percentComplete})
                    }}, 
                false); 
                return(xhr)
            }, 
            beforeSend:function(){
                jQuery(document).trigger('thumbnail_rendering')
            },
            success:function(response){
                bakehard.render.thumbnail.render(response,ctx) 
                bakehard.render.thumbnail.current_page++
                ctx.cache.posts_page[page]=response
            },
            error:function(result){
                jQuery(document).trigger('thumbnail_rendered',["fail"])
            },
            complete:function(){
                jQuery(document).trigger('thumbnail_progress',{"percent":100})
            }
        })
    }
}











