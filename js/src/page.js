goog.provide('bakehard.render.page');

bakehard.render.page.hide_all=function(selector){
    jQuery(selector).children().hide()
}
bakehard.render.page.show=function(selector){
    var div=jQuery('main').find(selector)
    div.show()
    div.trigger('show') 
}
bakehard.render.page.render=function(data,url){
    var body = '<div id="body-mock">' + data.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '') + '</div>';
    var content=jQuery(body).find('.content')
    content.attr('data-url',url)
    return(content)
}
bakehard.render.page.insert=function(data){
    jQuery('main').append(data)
}
bakehard.render.page.check=function(check_selector){
    return( Boolean(jQuery('main').find(check_selector).length) ) 
}

bakehard.render.page.load=function(ctx){
    var page_url=ctx.params[0] 
    var selector='[data-url="'+page_url+'"]'
    
    if(page_url[0]!="/"){
        page_url="/"+page_url
    }
   
    if( bakehard.render.page.check(selector) ){ 
        jQuery(document).trigger('page_rendering',{"page":page_url,"cached":true})
        bakehard.render.page.hide_all('main')   
        bakehard.render.page.show(selector)   
        jQuery(document).trigger('page_rendered',["success"])
    }else{
        jQuery.ajax({
                url:page_url,
                xhr:function(){
                    var xhr= new window.XMLHttpRequest(); 
                    jQuery(document).trigger('page_progress',{"percent":0})
                    xhr.addEventListener(
                    "progress", 
                    function(evt){
                        if (evt.lengthComputable) {  
                            var percentComplete = evt.loaded / evt.total;
                            jQuery(document).trigger('page_progress',{"percent":percentComplete})
                        }
                    }, 
                    false); 
                    return(xhr)
                },
                beforeSend:function(){
                    jQuery(document).trigger('page_rendering',{"page":page_url,"cached":false})
                },
                success:function(page){
                    bakehard.render.page.hide_all('main')   
                    var content=bakehard.render.page.render(page,page_url)//render page
                    bakehard.render.page.insert(content) 
                    jQuery(document).trigger('page_rendered',["success"])
                    ctx.cache.pages[page_url]=true
                },
                error:function(result){
                    jQuery(document).trigger('page_rendered',["fail"])
                },
                complete:function(){
                    jQuery(document).trigger('page_progress',{"percent":100})
                }
            })
    }
};


