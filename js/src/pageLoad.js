goog.provide('bakehard.pageLoad');

bakehard.pageLoad.content_class="content";
bakehard.pageLoad.content_selector="."+bakehard.pageLoad.content_class;

bakehard.pageLoad.clear=function(){
    var old_view=$(bakehard.pageLoad.content_selector).empty();
};

bakehard.pageLoad.extractInsert=function(data){
    var page=$.parseHTML(data)
    var content=$(page).select(bakehard.pageLoad.content_selector)
    $(bakehard.pageLoad.content_selector).append(content.children())
};

bakehard.pageLoad.render=function(page_url){
    $.ajax(
        {   url:page_url,
            beforeSend:function(){
                $(document).trigger('page_rendering',{"page":page_url})
            },
            success:function(result){
                bakehard.pageLoad.clear();
                bakehard.pageLoad.extractInsert(result);
                $(document).trigger('page_rendered',["success"])
            },
            error:function(result){
                $(document).trigger('page_rendered',["fail"])
            }
        }
    )
};
