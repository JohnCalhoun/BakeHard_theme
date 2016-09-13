goog.provide('bakehard.render.page');

goog.require('bakehard.loading')

jQuery(window).ready(function(){ jQuery(window).trigger('show')})

jQuery(window).on('page_rendering',bakehard.loading.start('#loading-screen','main',bakehard.templates.loading))
jQuery(window).on('page_progress',bakehard.loading.progress('#loading-screen'))
jQuery(window).on('page_rendered',bakehard.loading.stop('#loading-screen'))


bakehard.render.page.hide_all=function(selector){
    jQuery(selector).children().not('.loading').hide()
}

jQuery(window).on('page_rendering',function(){
    bakehard.render.page.hide_all('main')
})

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

bakehard.render.page.load=function(page_url){
    var selector='[data-url="'+page_url+'"]'
    
    if(page_url[0]!="/"){
        page_url="/"+page_url
    }
   
    if( bakehard.render.page.check(selector) ){ 
        jQuery(window).trigger('page_rendering',{"cached":true})
        bakehard.render.page.show(selector)   
        jQuery(window).trigger('page_rendered',["success"])
    }else{
        jQuery.ajax({
                url:page_url,
                xhr:function(){
                    var xhr= new window.XMLHttpRequest(); 
                    jQuery(window).trigger('page_progress',{"percent":0})
                    xhr.addEventListener(
                    "progress", 
                    function(evt){
                        if (evt.lengthComputable) {  
                            var percentComplete = evt.loaded / evt.total;
                            jQuery(window).trigger('page_progress',{"percent":percentComplete})
                        }
                    }, 
                    false); 
                    return(xhr)
                },
                beforeSend:function(){
                    jQuery(window).trigger('page_rendering',{"cached":false})
                },
                success:function(page){
                    var content=bakehard.render.page.render(page,page_url)//render page
                    bakehard.render.page.insert(content) 
                    jQuery(window).trigger('page_rendered',["success"])
                },
                error:function(result){
                    jQuery(window).trigger('page_rendered',["fail"])
                },
                complete:function(){
                    jQuery(window).trigger('page_progress',{"percent":100})
                }
            })
    }
};


