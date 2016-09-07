goog.provide('bakehard.pageLoad');

bakehard.pageLoad.content_class="content";
bakehard.pageLoad.content_selector="."+bakehard.pageLoad.content_class;

bakehard.pageLoad.clear=function(){
    var old_view=jQuery(bakehard.pageLoad.content_selector).empty();
};

bakehard.pageLoad.extractInsert=function(data){
    var page=jQuery.parseHTML(data)
    var content=jQuery(page).select(bakehard.pageLoad.content_selector)
    jQuery(bakehard.pageLoad.content_selector).append(content.children())
};

bakehard.pageLoad.render=function(page_url){
    jQuery.ajax(
        {   url:page_url,
            beforeSend:function(){
                jQuery(document).trigger('page_rendering',{"page":page_url})
            },
            success:function(result){
                bakehard.pageLoad.clear();
                bakehard.pageLoad.extractInsert(result);
                jQuery(document).trigger('page_rendered',["success"])
            },
            error:function(result){
                jQuery(document).trigger('page_rendered',["fail"])
            }
        }
    )
};
