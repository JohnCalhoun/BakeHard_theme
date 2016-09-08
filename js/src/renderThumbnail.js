goog.provide('bakehard.renderThumbnail');

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
bakehard.renderThumbnail.list_posts_url=function(){
    var uri=new goog.Uri("/wp-json/wp/v2/posts")
    uri.setParameterValue('page',bakehard.renderThumbnail.page_count+1)
    uri.setParameterValue('per_page',bakehard.renderThumbnail.per_page)
    return(uri.toString());
}

bakehard.renderThumbnail.page_count=0
bakehard.renderThumbnail.per_page=10

bakehard.renderThumbnail.loader=new goog.net.XhrIo();

goog.events.listen( 
    bakehard.renderThumbnail.loader,
    goog.net.EventType.COMPLETE,
    function(e){
        var xhr=e.target
        if(xhr.isSuccess()){
            var response=jQuery.parseJSON(xhr.getResponseText());
            jQuery.each(    
                response,
                function(index,val){
                    bakehard.renderThumbnail.render(val);
                }
            )
            jQuery(document).trigger('thumbnailLoaded',["success"]);
        }else{
            jQuery(document).trigger('thumbnailLoaded',["fail"]);
        }
    }
)

bakehard.renderThumbnail.render=function(post){ 
    jQuery(".grid").isotope('insert', 
        soy.renderAsFragment(
            bakehard.templates.thumbnail,
            post) 
    ); 
}

bakehard.renderThumbnail.load=function(){
    bakehard.renderThumbnail.loader.send(
        bakehard.renderThumbnail.list_posts_url()
    );
}

