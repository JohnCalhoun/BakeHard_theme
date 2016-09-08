goog.provide('bakehard.render.thumbnail');

goog.require('bakehard.templates');
goog.require('goog.net.XhrIo');
goog.require('goog.net.XhrIoPool');
goog.require('goog.net.EventType');
goog.require('goog.events');
goog.require('goog.Uri');

jQuery(window).load(
    function(){
        jQuery(".grid").isotope({
            itemSelector:".card",
            masonry:{
                columnWidth:200
            }
        });
    }
)
bakehard.render.thumbnail.per_page=10

bakehard.render.thumbnail.render=function(posts){ 
    jQuery.each(    
        posts,
        function(index,val){
            bakehard.render.thumbnail.render(val);
            jQuery(".grid").isotope(
                    'insert', 
                    soy.renderAsFragment(
                        bakehard.templates.thumbnail,
                        val
                    ) 
            );  
        }
    )
    jQuery(document).trigger('thumbnail_rendered',["success"])
}
bakehard.render.thumbnail.load=function(ctx){
    var api_url=ctx.params.path
    var page=ctx.params.page

    var request_url=api_url+"?/page="+page+"&per_page"+bakehard.render.thumbnail.per_page
    
    if(ctx.state.posts[page]){  
        bakehard.render.thumbnail.render(ctx.state.posts[page])
    }else{
        jQuery.ajax({   
                url:request_url,
                dataType:"json",
                beforeSend:function(){
                        jQuery(document).trigger('thumbnail_rendering')
                },
                success:function(response){
                    bakehard.render.thumbnail.render(response)
                    ctx.state.posts[page]=response
                },
                error:function(result){
                    jQuery(document).trigger('thumbnail_rendered',["fail"])
                }
        })
    }
}











