//------------------------------utility functions-------------------
hide_all=function(selector){
    jQuery(selector).children().not('.loading').css('display','none')
}

show=function(selector){
    var div=jQuery('main').find(selector).css('display','block')
    jQuery(window).trigger('page_rendered',["success"])
    jQuery(selector).trigger('page_ready')
}

//--------------------------------------------------------------
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

//-------------------------main functions
load=function(page_url){
    var selector='[data-url="'+page_url+'"]'
    
    console.log(page_url) 
    var ajax_call=function(resolve,reject){ 
        if( check(selector) ){ 
            hide_all('main')
            jQuery(window).trigger('page_rendering')
            show(selector)   
            resolve()
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
                        false
                    ); 
                    return(xhr)
                },
                beforeSend:function(){
                    hide_all('main')
                    jQuery(window).trigger('page_rendering')
                },
                success:function(page){
                    var content=render(page,page_url)
                    insert(content) 
                    show(selector)   
                    resolve()
                },
                error:function(result){
                    console.log('failed')
                    jQuery(window).trigger('page_rendered',["fail"])
                    reject(Error('ajax failed'))
                },
                complete:function(){
                    jQuery(selector).trigger('page_ready')
                    jQuery(window).trigger('page_progress',{"percent":100})
                }
            })
        }
    }
    return(new Promise(ajax_call))
};

module.exports=load
