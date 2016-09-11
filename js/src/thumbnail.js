goog.provide('bakehard.render.thumbnail');

goog.require('bakehard.templates');
goog.require('bakehard.constants');
goog.require('goog.net.XhrIo');
goog.require('goog.net.XhrIoPool');
goog.require('goog.net.EventType');
goog.require('goog.events');
goog.require('goog.Uri');

jQuery(window).ready(function(){ 
    jQuery(document).trigger('new_page') 
})

jQuery(window).on(
    'new_page',
    function(){
        jQuery(".thumbnail").isotope({
            itemSelector:".card",
            masonry:{
                columnWidth:200
            }
        });
    }
)

bakehard.render.thumbnail.current_page=0
bakehard.render.thumbnail.rendering=false

bakehard.render.thumbnail.render=function(posts,ctx){  
    jQuery.each(    
        posts,
        function(index,post){
            ctx.cache.posts[post['link']]=post
            jQuery(".thumbnail").isotope(
                    'insert', 
                    soy.renderAsFragment(
                        bakehard.templates.thumbnail,
                        post
                    ) 
            );  
        }
    )
    jQuery(document).trigger('thumbnail_rendered',["success"])
    bakehard.render.thumbnail.rendering=false
}
bakehard.render.thumbnail.api_url=bakehard.constants.api_url+'posts/'
bakehard.render.thumbnail.load=function(ctx){
    var page=ctx.params.page
    
    var request_url=bakehard.render.thumbnail.api_url+"?/page="+page+"&per_page="+bakehard.constants.post_per_page
    
    console.log(request_url)
    console.log(page)
    if(ctx.cache.post_pages[page]){  
        bakehard.render.thumbnail.render(ctx.state.post_pages[page])
        bakehard.render.thumbnail.rendering=false
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
                ctx.cache.post_pages[page]=response
            },
            error:function(result){
                jQuery(document).trigger('thumbnail_rendered',["fail"])
                bakehard.render.thumbnail.rendering=false
            },
            complete:function(){
                jQuery(document).trigger('thumbnail_progress',{"percent":100})
            }
        })
    }
}

jQuery(document).on('click','.load-thumbnail',function(){
    page("/thumbnail/"+bakehard.render.thumbnail.current_page)
})
/*
jQuery(document).on("scrolled2Bottom",function(){
    if(~bakehard.render.thumbnail.rendering){ 
        console.log('gothere') 
        bakehard.render.thumbnail.rendering=true
        if( jQuery('.grid').length){ 
            page("/thumbnail/"+bakehard.render.thumbnail.current_page)
        }else{
            bakehard.render.thumbnail.rendering=false
        }
    }
})
*/








