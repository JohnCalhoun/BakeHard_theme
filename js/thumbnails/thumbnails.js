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
    this._toggle=function(id,content,starting_class,ending_class){  
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
                if(['height'].includes(prop)){
                    container
                        .css('height','')
                        .css('width','')
                    
                    card.css('height','')
                        .css('width','')
                        .css('left','')
                        .off('transitionend')
                    
                    excerpt.css('width','') 
                }
            })

            card.css('left','0px') 
            this.stamp(container)
        }else{
            var reset_container=function(e){
                    var prop=e.originalEvent.propertyName 
                    if(['border-top-width'].includes(prop)){
                        container.css('height',this.old_container_height)
                        
                        if( starting_class===thumbnail_small){
                            container.removeClass('thumbnail-container-full')
                        }
                        this.unstamp(container)
                        card.off('transitionend',reset_container)
                    }
                }.bind(this)
            var reset_card=function(e){
                    var prop=e.originalEvent.propertyName 
                    if(['width','height'].includes(prop)){
                        card.css('width','')
                            .css('height','')
                            .css('border-width','')
                            .removeClass(ending_class)
                            .addClass(starting_class)
                        card.children('.thumbnail-title').css('height','')
                        card.off('transitionend',reset_card)
                    }
                } 
            if( starting_class===thumbnail_small){
                var new_width=card.parent().siblings('.grid-sizer').width()
            }else{
                var new_width=''     
            }
            card.on('transitionend',reset_container)
                .on('transitionend',reset_card)
                .css('width',
                    new_width 
                )
                .css('height',
                    this.old_height
                ).css('border-width',
                    '2px'
                )

        }
    }.bind(this)

    this.toggle=function(id){  
        this._toggle(
            id,
            '.thumbnail-excerpt',
            thumbnail_small,
            thumbnail_medium
        )
    }.bind(this)

    this.open=function(id,from){ 
        this.iso.arrange({filter:id}) 
        if(this.stamp_card){
            this.iso.unstamp(jQuery(id))
        }
        var container=jQuery(id)
            .addClass('thumbnail-container-full') 
        
        var card=container
            .children('.thumbnail') 
        var wipe=card.children(':not(.thumbnail-title,.feature-image):visible').length

        card.outerHeight(card.outerHeight())
            .outerWidth(card.outerWidth())
            .removeClass(from)
            .addClass(thumbnail_large)
        
        card.outerWidth(card.parent().width()) 
            .on('transitionend',function(e){
                var new_height=0

                card.children(':visible').each(
                    function(){
                        new_height+=jQuery(this).outerHeight(true)
                    }) 
                var prop=e.originalEvent.propertyName 
                if(['width'].includes(prop)){
                    var tmp=card.children(':not(.thumbnail-title):visible')
                    tmp.css('opacity','0')
                    container.outerHeight(new_height) 
                    this.iso.arrange({filter:id}) 

                    var finish=function(){
                        card.height(new_height) 
                            .off('transitionend')
                            .on('transitionend',function(e){
                                var prop=e.originalEvent.propertyName 
                                if(['height'].includes(prop)){
                                    card.css('height','') 
                                        .css('width','') 
                                        .off('transitionend')
                                }
                            })
                        tmp.css('opacity','1') 
                        container.css('height','')
                    }
                    if(wipe){
                        card.outerHeight(card.children('.thumbnail-title').outerHeight(true)) 
                        card.on('transitionend',function(e){
                                var prop=e.originalEvent.propertyName 
                                if(['height'].includes(prop)){
                                    finish() 
                                }
                           }.bind(this))
                    }else{
                        finish()
                    }
                }
            }.bind(this))
           }.bind(this)

    this.close_medium=function(id){
        var container=jQuery(id)
        var card=container.children('.thumbnail') 
        card.outerHeight(card.outerHeight())
            .removeClass(thumbnail_large)
            .addClass(thumbnail_medium)
        
        var new_height=0
        card.children(':visible').each(
            function(){
                var child=jQuery(this)
                new_height+=child.outerHeight(true)
            })
         
        var tmp=card.children(':not(.thumbnail-title):visible')
        tmp.css('opacity','0')

        container.outerHeight(new_height) 
        this.iso.arrange() 
        
        card.outerHeight(card.children('.thumbnail-title').outerHeight(true)) 
        card.on('transitionend',function(e){
                var prop=e.originalEvent.propertyName 
                if(['height'].includes(prop)){
                    card.outerHeight(new_height) 
                        .off('transitionend')
                        .on('transitionend',function(e){
                            var prop=e.originalEvent.propertyName 
                            if(['height'].includes(prop)){
                                card.css('height','') 
                                    .off('transitionend')
                            }
                        })
                    tmp.css('opacity','1') 
                    container.css('height','')
                }
           }.bind(this))
    }.bind(this)
    
    this.close_small=function(id){
        var container=jQuery(id)
        var card=container.children('.thumbnail') 
        card.css('width','auto') 

        card.height(card.height())
            .width(card.width())
            .removeClass(thumbnail_large)
            .addClass(thumbnail_small)
         
        var new_height=0
        card.children(':visible').each(
            function(){
                new_height+=jQuery(this).outerHeight(true)
            })
        var container_height=new_height
                +parseInt(card.css('margin-top')) 
                +parseInt(card.css('margin-bottom')) 

        console.log(container_height) 
        container.outerHeight(container_height )
            .toggleClass('thumbnail-container-full')  
        
        this.iso.arrange({
            filter:this.filter_string
        })
        card.height(new_height) 
            .css('width','')
            .css('z-index','1')
            .on('transitionend',function(e){
                var prop=e.originalEvent.propertyName 
                if(['height'].includes(prop)){
                    card.css('height','') 
                        .off('transitionend')
                        .css('z-index','')
                    container.css('height','')
                }
            })
    }.bind(this)
}

module.exports=posts
