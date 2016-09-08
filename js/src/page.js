goog.provide('bakehard.render.page');

bakehard.render.page.clear=function(selector){
    jQuery(selector).empty();
};

bakehard.render.page.extractInsert=function(data,in_selector,out_selector){
    var page=jQuery.parseHTML(data)
    var content=jQuery(page).select(in_selector)
    jQuery(out_selector).append(content.children())
};

bakehard.render.page.load=function(ctx){
    var page_url=ctx.params.path
    var in_selector=ctx.params.in_selector
    var out_selector=ctx.params.out_selector
    
    render=function(data){ 
        jQuery(document).trigger('page_rendering',{"page":page_url,"cached":true})
        bakehard.render.pageLoad.clear(out_selector);
        bakehard.render.pageLoad.extractInsert(data,in_selector,out_selector);
        jQuery(document).trigger('page_rendered',["success"]) 
    } 

    if( stx.state[path_url] ){
        render(ctx.state[path_url]) 
    }else{
        jQuery.ajax(
            {   url:page_url,
                beforeSend:function(){
                    jQuery(document).trigger('page_rendering',{"page":page_url,"cached":false})
                },
                success:function(result){
                    render(result) 
                    ctx.state[path_url]=result
                },
                error:function(result){
                    jQuery(document).trigger('page_rendered',["fail"])
                }
            }
        )
    }
};


