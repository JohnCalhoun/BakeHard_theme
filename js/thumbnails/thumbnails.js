var packery=require('isotope-packery')
var Isotope=require('isotope-layout')

var posts=function(constants,thumbnail_template,selector,type){   
    var thumbnail_class='.thumbnail-container'
    var thumbnail_small ='thumbnail-small'
    var thumbnail_medium='thumbnail-medium'
    var thumbnail_large ='thumbnail-full'
     
    this.initialized=false
    this.transitioning=true
    this.current_page=0
    this.filter_string="*"
    this.thumbnail_template=thumbnail_template
//--------------loading------------------------ 
    this.IsotopeInit=function(f){
        var filter_s = (typeof f !== 'undefined') ?  f : this.filter_string;
        var iso_settings={
                itemSelector:thumbnail_class,
                layoutMode:'packery',
                packery:{
                    columnWidth:'.grid-sizer',
                    gutter:'.gutter-sizer',
                    percentPosition:true
                },
                masonry:{
                    columnWidth:'.grid-sizer',
                    gutter:'.gutter-sizer'
                },
                getSortData:{
                    target:'[data-sort]'
                },
                sortBy:'target',
                filter:filter_s,
                hiddenStyle:{
                    opacity:0
                },
                visibleStyle:{
                    opacity:1
                }
                }
        if(!this.initialized){
            this.iso=new Isotope(
                selector,
                iso_settings
            );
            this.initialized=true
        }
        var onResize=function(){
            var grid=jQuery(selector)

            var thumbnail=grid.find('.grid-sizer')[0].getBoundingClientRect().width
            var gutter=grid.find('.gutter-sizer')[0].getBoundingClientRect().width
            var parrent=grid.parent()
            
            var parrent_w=parrent[0].getBoundingClientRect().width
            var parrent_padding=parseInt(parrent.css('padding-left'))+parseInt(parrent.css('padding-right'))
            parrent_w=parrent_w-parrent_padding 
           
            var x=Math.floor( (parrent_w-thumbnail)/(thumbnail+gutter) )
            var width=thumbnail+x*(thumbnail+gutter)
            
            if( (2*thumbnail+gutter)>parrent_w){
                grid.css('width','100%') 
                grid.addClass('single-lane')
            }else{
                grid.removeClass('single-lane')
                grid.css('width',width.toString()+'px') 
            }
        }
        this.iso.on('arrangeComplete',onResize)
        this.iso.on('arrangeComplete',function(){
            this.transitioning=false
        }.bind(this))
    }.bind(this)
    
    this.resize=function(){
        this.transitioning=true
        this.iso.arrange()
    }.bind(this)
 
    jQuery(window).resize(this.resize)
  
    this.api_url=function(page){
        if(page){
            return(constants.api_url+type+"?page="+page+"&per_page="+constants.post_per_page)
        }else{
            return(constants.api_url+type+"?per_page=100")
        }
    }.bind(this)

    this.emit=function(name,args){
        jQuery(document).trigger(name,args)
    }
    this.exclude=new Array()

    this.render=function(posts){  
        var elems=[]
        jQuery.each(    
            posts,
            function(index,post){
                var thumb=jQuery(this.thumbnail_template(post))
                thumb.find('img.feature-image')
                    .on(    'load',
                            function(){
                                this.iso.layout()
                    }.bind(this))
                if( ~this.exclude.includes(post.id)){
                    elems.push(        
                        thumb[0]
                    )
                    this.exclude.push(post.id)
                }
            }.bind(this)
        )
        this.iso.insert(elems)
        this.emit('thumbnail_rendered',["success"])
    }.bind(this)

    this.load=function(page,url_function){
        var url_function=(typeof url_function !== 'undefined') ? url_function : this.api_url;
        var load_promise=new Promise(function(resolve,reject){ 
            jQuery.ajax({   
                url:url_function(page),
                dataType:"json",
                success:function(response){ 
                    resolve(response)
                },
                error:function(result,stat,error){
                    reject()
                },
            })
        })
        return(load_promise.then(function(response){
            this.render(response)
        }.bind(this)))
        
    }.bind(this)
//-------------------------------loads
    this.load_id=function(id){
        var url_function=function(){
            return(this.api_url()+'&include='+id.join(',') )
        }.bind(this)

        return(this.load(0,url_function))

    }.bind(this)

    this.load_new=function(){
        this.current_page++
        return(this.load(this.current_page))
    }.bind(this)
 
    this.load_all=function(){
        return(this.load())
    }.bind(this)
//-----------------------------sorting 
    this.sort=function(){
        this.iso.arrange({sortBy:'target'}) 
    }.bind(this)
    
    this.filter=function(selector){
        this.filter_string=selector;
        this.IsotopeInit()
    }.bind(this)
//-----------------------------opening--------------
    this.stamp_card=null
    
    this.stamp=function(card){
        if(~this.stamp_card){
            this.iso.unstamp(this.stamp_card)
        }  
        this.stamp_card=card
        this.iso.stamp(this.stamp_card)
        this.resize()
    }.bind(this)
    
    this.unstamp=function(card){
        this.iso.unstamp(card)
        this.stamp_card=null
        this.resize()
    }.bind(this)
    
    this.old_height={}
    this.old_container_height={}
    this.open=function(id){  
        var content='.thumbnail-excerpt'
        var starting_class=thumbnail_small
        var ending_class=thumbnail_medium

        if(this.transitioning){
            return 
        }
        var container=jQuery(id)
        var card=container.children(' .thumbnail') 
        var excerpt=card.children(content)
        
        card.outerHeight(card.outerHeight())
            .outerWidth(card.outerWidth())
   
        container.siblings()
            .removeClass('thumbnail-container-full')
            .children('.'+ending_class)
            .removeClass(ending_class)
            .addClass(starting_class)

        if( card.hasClass(starting_class) ){
            var ending={} 
            container.addClass('thumbnail-container-full')
            ending.width=container.outerWidth(true) 

            this.old_height=card.outerHeight()
            this.old_container_height=container.outerHeight()
                   
            card.removeClass(starting_class)
                .addClass(ending_class)
                .children('.thumbnail-title')
                .outerHeight( card.children('.thumbnail-title').outerHeight())

            var excerpt=card.children(content)
            excerpt.outerWidth(
                ending.width
                -parseInt(excerpt.css('margin-left'))
                -parseInt(excerpt.css('margin-right'))
                -parseInt(card.css('border-right-width'))
                -parseInt(card.css('border-left-width'))
                ) 

            ending.height=excerpt.outerHeight(true)
                            +excerpt.siblings('.feature-image').outerHeight(true)
                            +card.children('.thumbnail-title').outerHeight(true)

            container.css('height',ending.height)

            card.outerHeight(
                    ending.height
                    +parseInt(card.css('border-top-width'))
                    +parseInt(card.css('border-bottom-width'))
                )
                .outerWidth(ending.width) 
            
            var left=container.css('left')
            
            card.css('left',left)
            container.css('left','0px') 

            card.on('transitionend',function(e){
                var prop=e.originalEvent.propertyName 
                if(['width','height'].includes(prop)){
                    container.css('height','')
                    container.css('width','')
                    card.css('height','')
                    card.css('width','')
                    card.css('left','')
                    card.off('transitionend')
                    excerpt.css('width','') 
                }
            })

            this.stamp(container)
            card.css('left','0px') 
        }else{
            card.on('transitionend',function(e){
                    var prop=e.originalEvent.propertyName 
                    console.log(1,prop) 
                    if(['border-top-width'].includes(prop)){
                        container.css('height',this.old_container_height) 
                        container.removeClass('thumbnail-container-full')
                        this.unstamp(container)
                    }
                }.bind(this))
                .on('transitionend',function(e){
                    var prop=e.originalEvent.propertyName 
                    console.log(2,prop) 
                    if(['width','height'].includes(prop)){
                        card.css('width','')
                            .css('height','')
                            .css('border-width','')
                            .removeClass(ending_class)
                            .addClass(starting_class)
                        card.children('.thumbnail-title').css('height','')
                        card.off('transitionend')
                    }
                })
                .css('width',
                    card.parent().siblings('.grid-sizer').width()
                )
                .css('height',
                    this.old_height
                ).css('border-width',
                    '2px'
                )

        }
    }.bind(this)
}

module.exports=posts
