module.exports=function(vars){

jQuery(window).ready(function(){ jQuery(window).trigger('show')})
jQuery(window).on('page_rendering',bh.progress.start('#loading-screen','main',bh.templates.components.loading))
jQuery(window).on('page_progress',bh.progress.progress('#loading-screen'))
jQuery(window).on('page_rendered',bh.progress.stop('#loading-screen'))

hide_all=function(selector){
    jQuery(selector).children().not('.loading').hide()
}

jQuery(window).on('page_rendering',function(){
    hide_all('main')
})

show=function(selector){
    var div=jQuery('main').find(selector)
    div.show()
    div.trigger('show') 
}
render=function(data,url){
    var body = '<div id="body-mock">' + data.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '') + '</div>';
    var content=jQuery(body).find('.content')
    content.attr('data-url',url)
    return(content)
}
insert=function(data){
    jQuery('main').append(data)
}
check=function(check_selector){
    return( Boolean(jQuery('main').find(check_selector).length) ) 
}

load=function(page_url){
    var selector='[data-url="'+page_url+'"]'
    
    if(page_url[0]!="/"){
        page_url="/"+page_url
    }
   
    if( check(selector) ){ 
        jQuery(window).trigger('page_rendering',{"cached":true})
        show(selector)   
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
                    var content=render(page,page_url)
                    insert(content) 
                    show(selector)   
                    jQuery(window).trigger('page_rendered',["success"])
                },
                error:function(result){
                    console.log('failed')
                    jQuery(window).trigger('page_rendered',["fail"])
                },
                complete:function(){
                    jQuery(window).trigger('page_progress',{"percent":100})
                }
            })
    }
};

}
