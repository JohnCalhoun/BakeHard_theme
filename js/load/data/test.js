(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//------------------------------utility functions-------------------
hide_all=function(selector){
    jQuery(selector).children().not('.loading').addClass('hide')
}

show=function(selector){
    var div=jQuery('main').find(selector)
    div.removeClass('hide')
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

//-------------------------main functions
load=function(page_url){
    var selector='[data-url="'+page_url+'"]'
    
    if(page_url[0]!="/"){
        page_url="/"+page_url
    }
    
    var ajax_call=function(resolve,reject){ 
        if( check(selector) ){ 
            hide_all('main')
            jQuery(window).trigger('page_rendering',{"cached":true})
            show(selector)   
            jQuery(window).trigger('page_rendered',["success"])
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
                    jQuery(window).trigger('page_rendering',{"cached":false})
                },
                success:function(page){
                    var content=render(page,page_url)
                    insert(content) 
                    show(selector)   
                    jQuery(window).trigger('page_rendered',["success"])
                    resolve()
                },
                error:function(result){
                    console.log('failed')
                    jQuery(window).trigger('page_rendered',["fail"])
                    reject(Error('ajax failed'))
                },
                complete:function(){
                    jQuery(window).trigger('page_progress',{"percent":100})
                }
            })
        }
    }
    return(new Promise(ajax_call))
};

module.exports=load

},{}],2:[function(require,module,exports){
var load=require('./load.js')

load("/load/data/page_1.html")   
    .then(function(){
        return(load("/load/data/page_2.html"))
    }).then(function(){
        return(load("/load/data/not_here.html"))  
    }).then(
        function(){},
        function(){
            jQuery('main').attr('id','done')
        }
    )

},{"./load.js":1}]},{},[2]);
