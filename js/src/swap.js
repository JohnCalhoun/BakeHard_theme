goog.provide('bakehard.pageLoad');

bakehard.pageLoad.clear=function(selector){
    jQuery(selector).empty();
};

bakehard.pageLoad.extractInsert=function(data,in_selector,out_selector){
    var page=jQuery.parseHTML(data)
    var content=jQuery(page).select(in_selector)
    jQuery(out_selector).append(content.children())
};

bakehard.pageLoad.swap=function(page_url,in_selector,out_selector){
    jQuery.ajax(
        {   url:page_url,
            beforeSend:function(){
                jQuery(document).trigger('page_rendering',{"page":page_url})
            },
            success:function(result){
                bakehard.pageLoad.clear(out_selector);
                bakehard.pageLoad.extractInsert(result,in_selector,out_selector);
                jQuery(document).trigger('page_rendered',["success"])
            },
            error:function(result){
                jQuery(document).trigger('page_rendered',["fail"])
            }
        }
    )
};
