goog.provide('bakehard.render.thumbnail');

goog.require('bakehard.templates');
goog.require('bakehard.constants');
goog.require('bakehard.loading');
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
    //loading  
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
        
        page("/page/"+path)
    }
)
bakehard.render.thumbnail.isotopeInit=function(){ 
    jQuery(".thumbnail").isotope({
        itemSelector:".card",
        masonry:{
            columnWidth:100
        }
    });
}

jQuery(window).on('show','.content',bakehard.render.thumbnail.isotopeInit)
jQuery(window).on('page_rendered',bakehard.render.thumbnail.isotopeInit)


jQuery(window).on('thumbnail_rendering',bakehard.loading.start('#loading-thumbnail','#thumbnail-status',bakehard.templates.loadingThumbnail))
jQuery(window).on('thumbnail_progress',bakehard.loading.progress('#loading-thumbnail'))
jQuery(window).on('thumbnail_rendered',bakehard.loading.stop('#loading-thumbnail'))




