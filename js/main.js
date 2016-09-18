var constants=require('./constants/constants.js')
var load=require('./load/load.js')
var nav=require('./nav/nav.js')
var pages=require('./pages/pages.js')
var progress=require('./progress/progress.js')
var posts=require('./posts/posts.js')
var routes=require('./routes/routes.js')
var templates=require('./templates/templates.js')


jQuery(document).on('click','.nav,.a',function(e){
    var element=jQuery(e.target).parent()
    var nav=element.parent()

    nav.find('.active').removeClass('active')
    element.addClass('active')
})

jQuery(window).on('show','.content',isotopeInit)
jQuery(window).on('page_rendered',isotopeInit)


jQuery(window).on('thumbnail_rendering',bh.progress.start('#loading-thumbnail','#thumbnail-status',bh.templates.loadingThumbnail))
jQuery(window).on('thumbnail_progress',bh.progress.progress('#loading-thumbnail'))
jQuery(window).on('thumbnail_rendered',bh.progress.stop('#loading-thumbnail'))

jQuery(window).ready(function(){ 
    jQuery(document).trigger('new_page') 
})


jQuery(document).on('show','.content',function(e){
    if(current_page==1){  
        load(current_page)
    }else{
        jQuery(e.target).find('.thumbnail').isotope('layout')
    }
})

    jQuery(document).on('click','.load-thumbnail',function(){
        this.load(this.current_page)
    }.bind(this))

    jQuery(document).on(    
        'click',
        '.content-thumbnail .cat-item a',
        function(e){ 
            e.preventDefault() 
            var target=jQuery(e.target)
            var category='.'+target.text()
            
            if( target.parent().hasClass('filtered') ){
                target.parent().removeClass('filtered') 
                var index=this.filter.indexOf(category)
                filter.splice(index,1)
            }else{ 
                this.filter.push(category)
                target.parent().addClass('filtered')
            }
            var filter_string=this.filter.join(',')
            jQuery(".thumbnail").isotope(
                {this.filter:filter_string}
            );

        }.bind(this)
    jQuery(document).on('click','.post-link',
        function(e){
            e.preventDefault()  
            var link=jQuery(e.target)
            var path=link.attr('href')
            
            jQuery(window).trigger('change_page',page) 
        }
    )

