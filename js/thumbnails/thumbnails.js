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
                filter:filter_s
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
    this.open=function(id){  
        if(this.transitioning){
            return 
        }
        var container=jQuery(id)
        var starting={}
        var ending={}
        starting.height=container.outerHeight(true)
        starting.width=container.outerWidth(true)
        container.toggleClass('thumbnail-container-full')
        ending.width=container.outerWidth(true) 

        var card=jQuery(id+' .thumbnail').not('.'+thumbnail_large)
        var others=container.siblings()
                    .removeClass('thumbnail-container-full')
                    .css('height','')
                    .children('.'+thumbnail_medium)
                    .removeClass(thumbnail_medium)
                    .addClass(thumbnail_small)
                    .css('height','')
                    .css('width','')
        
        if( card.hasClass(thumbnail_small) ){
            var excerpt=card.children('.thumbnail-excerpt')
            this.old_height=card.height() 
            card.removeClass(thumbnail_small)
                .addClass(thumbnail_medium)
            
            card.outerHeight(starting.height) 
            card.outerWidth(starting.width) 

            excerpt.outerWidth(
                ending.width
                -parseInt(excerpt.css('margin-left'))
                -parseInt(excerpt.css('margin-right'))
                ) 
            
            ending.height=excerpt.outerHeight(true)
                            +excerpt.siblings('.feature-image').outerHeight(true)
            container.css('height',ending.height)

            card.outerHeight(ending.height) 
            card.outerWidth(ending.width) 
            
            var left=container.css('left')
            
            card.css('left',left)
            container.css('left','0px') 
             
            card.on('transitionend',function(e){
                var prop=e.originalEvent.propertyName 
                if(prop != 'box-shadow'){ 
                    console.log(prop)
                    container.css('height','')
                    container.css('width','')
                    card.css('height','')
                    card.css('left','')
                    excerpt.css('width','') 
                    card.off('transitionend')
                }
            })

            this.stamp(container)
            card.css('left','0px')
        
        }else{
            card.css('height',card.height())
                .removeClass(thumbnail_medium)
                .removeClass('hoverable')
                .addClass(thumbnail_small)
                .css('width',card.parent().siblings('.grid-sizer').width())
                .css('height',this.old_height) 
                .children('.thumbnail-title')
                .css('width',card.parent().siblings('.grid-sizer').width())

            container.css('height',this.old_height) 
            
            card.one('transitionend',function(){
                card.css('width','')
                    .css('height','')
                    .addClass('hoverable')
                    .children('.thumbnail-title')
                    .css('width','')
            
            })
            this.unstamp(container)
        }
    }.bind(this)
}

module.exports=posts
