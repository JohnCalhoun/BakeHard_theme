goog.provide('bakehard.render.page');

bakehard.render.page.extractInsert=function(data,in_selector,out_selector){
    console.log(in_selector) 
    console.log(out_selector) 
    
    jQuery(out_selector).empty();
    var page=jQuery.parseHTML(data)
    var content=jQuery(page).select(in_selector)
    jQuery(out_selector).append(content.children())
};

bakehard.render.page.load=function(ctx){
    var page_url=ctx.params[0]
    var in_selector=ctx.params.source_id
    var out_selector=ctx.params.target_id

    if(page_url[0]!="/"){
        page_url="/"+page_url
    }

    render=function(data){ 
        bakehard.render.page.extractInsert(data,in_selector,out_selector);
        jQuery(document).trigger('page_rendered',["success"]) 
    } 

    if( ctx.cache.pages[page_url] ){
        jQuery(document).trigger('page_rendering',{"page":page_url,"cached":true})
        render(ctx.state[page_url]) 
    }else{
        jQuery.ajax({
                url:page_url,
                beforeSend:function(){
                    jQuery(document).trigger('page_rendering',{"page":page_url,"cached":false})
                },
                success:function(page){
                    render(page) 
                    ctx.cache.pages[page_url]=page
                },
                error:function(result){
                    jQuery(document).trigger('page_rendered',["fail"])
                }
            })
    }
};


