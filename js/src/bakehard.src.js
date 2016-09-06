goog.provide('bakehard.view');

bakehard.view.content_class="content";
bakehard.view.content_selector="."+bakehard.view.content_class;

bakehard.view.clear=function(){
    var old_view=$(bakehard.view.content_selector).empty();
};

bakehard.view.extractInsert=function(data){
    var page=$.parseHTML(data)
    var content=$(page).select(bakehard.view.content_selector)
    $(bakehard.view.content_selector).append(content.children())
};

bakehard.view.render=function(page_url){
    $.ajax(
        {   url:page_url,
            success:function(result){
                bakehard.view.clear();
                bakehard.view.extractInsert(result);
                $(document).trigger('page_rendered')
            }
        }
    )
};
