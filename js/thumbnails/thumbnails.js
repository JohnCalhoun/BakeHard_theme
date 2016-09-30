var packery=require('isotope-packery')
var Isotope=require('isotope-layout')

var posts=function(constants,thumbnail_template,selector,type){   
    var thumbnail_class='.thumbnail'
    var thumbnail_small ='thumbnail-small'
    var thumbnail_medium='thumbnail-medium'
    var thumbnail_large ='thumbnail-full'

    this.current_page=1
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
                    gutter:'.gutter-sizer'
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
        this.iso=new Isotope(
            selector,
            iso_settings
        );
        var onResize=function(){
            var window_width=window.innerWidth
            var grid=jQuery(selector)
            var old=grid[0].getBoundingClientRect().width

            var thumbnail=grid.find('.grid-sizer')[0].getBoundingClientRect().width
            var gutter=grid.find('.gutter-sizer')[0].getBoundingClientRect().width
            var parrent=grid.parent()
            
            var parrent_w=parrent[0].getBoundingClientRect().width
            var parrent_padding=parseInt(parrent.css('padding-left'))+parseInt(parrent.css('padding-right'))
            parrent_w=parrent_w-parrent_padding 

            var x=Math.floor( (parrent_w-thumbnail)/(thumbnail+gutter) )
            var width=thumbnail+x*(thumbnail+gutter)
            
            grid.css('width',width.toString()+'px') 
            
            var window_width2=window.innerWidth
            if( window_width2 !== window_width ){
                onResize() 
            }
        }
        this.iso.on('arrangeComplete',onResize)
    }.bind(this)
     
    this.resize=function(){
        this.iso.arrange()
    }.bind(this)
 
    jQuery(window).resize(this.resize)
  
    this.api_url=function(page){
        var exclude='&exclude='+this.exclude.join(',')
        if(page){
            return(constants.api_url+type+"?page="+page+"&per_page="+constants.post_per_page+exclude)
        }else{
            return(constants.api_url+type+"?per_page=100"+exclude)
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
                elems.push(        
                    thumb[0]
                )
                this.exclude.push(post.id)
            }.bind(this)
        )
        this.iso.insert(elems)
        this.emit('thumbnail_rendered',["success"])
    }.bind(this)

    this.load=function(page,url_function){
        var url_function=(typeof url_function !== 'undefined') ? url_function : this.api_url;
        
        jQuery.ajax({   
            url:url_function(page),
            dataType:"json",
            xhr:function(){
                var xhr= new window.XMLHttpRequest(); 
                this.emit('thumbnail_progress',{"percent":0})
                xhr.addEventListener(
                "progress", 
                function(evt){
                    if (evt.lengthComputable) {  
                        var percentComplete = evt.loaded / evt.total;
                        this.emit('thumbnail_progress',{"percent":percentComplete})
                    }}.bind(this), 
                false); 
                return(xhr)
            }.bind(this), 
            beforeSend:function(){
                this.emit('thumbnail_rendering')
            }.bind(this),
            success:function(response){
                this.render(response) 
            }.bind(this),
            error:function(result,stat,error){
                this.emit('thumbnail_rendered',["fail"])
            }.bind(this),
            complete:function(){
                this.emit('thumbnail_progress',{"percent":100})
            }.bind(this)
        })
    }.bind(this)
//-------------------------------loads
    this.load_id=function(id){
        var url_function=function(){
            return(this.api_url()+'&include='+id.join(',') )
        }.bind(this)

        this.load(0,url_function)

    }.bind(this)

    this.load_new=function(){
        this.load(this.current_page)
        this.current_page++
    }.bind(this)
 
    this.load_all=function(){
        this.load()
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

    this.open=function(id){  
        var card=jQuery(id).not('.'+thumbnail_large)
        var others=card.siblings(thumbnail_medium)
                    .removeClass(thumbnail_medium)
                    .addClass(thumbnail_small)
        
        card.toggleClass(thumbnail_medium)
                .toggleClass(thumbnail_small)

        if( card.hasClass(thumbnail_medium) ){
            card.css('left','0px')
            this.stamp(card)
        }else{
            this.unstamp(card)
        }
    }.bind(this)
//-----------------------------viewing-------------- 
    this.viewing_id=null
    this.toggle_view=function(id){
        this.viewing_id=id
        var card=jQuery(id)
        card.removeClass(thumbnail_medium)
        card.removeClass(thumbnail_small)
        card.addClass(thumbnail_large)
        //this.iso.layout()
    }.bind(this)

}

module.exports=posts
