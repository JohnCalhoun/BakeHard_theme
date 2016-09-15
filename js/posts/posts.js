module.exports=function(vars){

jQuery(window).ready(function(){ 
    jQuery(document).trigger('new_page') 
})

current_page=1
render=function(posts){  
    var elems=[]
    jQuery.each(    
        posts,
        function(index,post){
            elems.push(        
                soy.renderAsFragment(
                    bh.templates.components.thumbnail,
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
    rendering=false
}
api_url=function(page){
    var url=bh.constants.api_url+'posts'+"?page="+page+"&per_page="+bh.constants.post_per_page
    return(url)
}
load=function(page_number){
    var page=page_number
    
    var request_url=api_url(page)
    //dont load posts already loaded
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
            render(response) 
            current_page++
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
    if(current_page==1){  
        //---load sticky 
        load(current_page)
    }else{
        jQuery(e.target).find('.thumbnail').isotope('layout')
    }
})

jQuery(document).on('click','.load-thumbnail',function(){
    load(current_page)
})


filter=[]
jQuery(document).on(    
    'click',
    '.content-thumbnail .cat-item a',
    function(e){ 
        e.preventDefault() 
        var target=jQuery(e.target)
        var category='.'+target.text()
        
        if( target.parent().hasClass('filtered') ){
            target.parent().removeClass('filtered') 
            var index=filter.indexOf(category)
            filter.splice(index,1)
        }else{ 
            //load all from category
            filter.push(category)
            target.parent().addClass('filtered')
        }
        var filter_string=filter.join(',')
        jQuery(".thumbnail").isotope(
            {filter:filter_string}
        );

    }
)
                

jQuery(document).on('click','.post-link',
    function(e){
        e.preventDefault()  
        var link=jQuery(e.target)
        var path=goog.uri.utils.getPath(link.attr('href'))
        
        jQuery(window).trigger('change_page',page) 
    }
)
isotopeInit=function(){ 
    jQuery(".thumbnail").isotope({
        itemSelector:".thumbnail-card",
        masonry:{
            columnWidth:'.grid-sizer',
            gutter:'.gutter-sizer',
            stagger:10
        }
    });
}

jQuery(window).on('show','.content',isotopeInit)
jQuery(window).on('page_rendered',isotopeInit)


jQuery(window).on('thumbnail_rendering',bh.progress.start('#loading-thumbnail','#thumbnail-status',bh.templates.loadingThumbnail))
jQuery(window).on('thumbnail_progress',bh.progress.progress('#loading-thumbnail'))
jQuery(window).on('thumbnail_rendered',bh.progress.stop('#loading-thumbnail'))



}
