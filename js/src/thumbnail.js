goog.provide('bakehard.render.thumbnail');

goog.require('bakehard.templates');
goog.require('bakehard.constants');
goog.require('goog.net.XhrIo');
goog.require('goog.net.XhrIoPool');
goog.require('goog.net.EventType');
goog.require('goog.events');
goog.require('goog.Uri');

jQuery(window).ready(function(){ 
    jQuery(document).trigger('new_page') 
})

bakehard.render.thumbnail.current_page=1

bakehard.render.thumbnail.render=function(posts){  
    var elems=[]
    jQuery.each(    
        posts,
        function(index,post){
            elems.push(        
                soy.renderAsFragment(
                    bakehard.templates.thumbnail,
                    post
                )
            )
        }
    )
    jQuery(".thumbnail").isotope(
        "insert",
        elems
    );

    jQuery(document).trigger('thumbnail_rendered',["success"])
    bakehard.render.thumbnail.rendering=false
}
bakehard.render.thumbnail.api_url=function(page){
    var url=bakehard.constants.api_url+'posts'+"?page="+page+"&per_page="+bakehard.constants.post_per_page
    return(url)
}
bakehard.render.thumbnail.load=function(page_number){
    var page=page_number
    
    var request_url=bakehard.render.thumbnail.api_url(page)

    jQuery.ajax({   
        url:request_url,
        dataType:"json",
        xhr:function(){
            var xhr= new window.XMLHttpRequest(); 
            jQuery(document).trigger('thumbnail_progress',{"percent":0})
            xhr.addEventListener(
            "progress", 
            function(evt){
                if (evt.lengthComputable) {  
                    var percentComplete = evt.loaded / evt.total;
                    jQuery(document).trigger('thumbnail_progress',{"percent":percentComplete})
                }}, 
            false); 
            return(xhr)
        }, 
        beforeSend:function(){
            jQuery(document).trigger('thumbnail_rendering')
        },
        success:function(response){
            bakehard.render.thumbnail.render(response) 
            bakehard.render.thumbnail.current_page++
        },
        error:function(result){
            jQuery(document).trigger('thumbnail_rendered',["fail"])
        },
        complete:function(){
            jQuery(document).trigger('thumbnail_progress',{"percent":100})
        }
    })
}
jQuery(document).on('show','.content',function(e){
    if(bakehard.render.thumbnail.current_page==1){
        bakehard.render.thumbnail.load(bakehard.render.thumbnail.current_page)
    }else{
        jQuery(e.target).find('.thumbnail').isotope('layout')
    }
})

jQuery(document).on('click','.load-thumbnail',function(){
    bakehard.render.thumbnail.load(bakehard.render.thumbnail.current_page)
})

jQuery(document).on('click','.post-link',
    function(e){
        e.preventDefault()  
        var link=jQuery(e.target)
        var path=goog.uri.utils.getPath(link.attr('href'))
        
        var nav=link.parents('.thumbnail') 
        var target_id=nav.attr('data-target-window')
        var source_id=nav.attr('data-source-window') 
        var base_url=bakehard.constants.site_url
        page("/page/"+target_id+"/"+source_id+'/'+path)
    }
)

jQuery(window).on(
    'show',
    function(){
        jQuery(".thumbnail").isotope({
            itemSelector:".card",
            masonry:{
                columnWidth:100
            }
        });
    }
)




