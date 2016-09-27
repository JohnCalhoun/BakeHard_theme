var Isotope=require('isotope-layout')

var posts=function(constants,thumbnail_template,selector,type){
    this.current_page=1
    this.filter=[]
    this.thumbnail_template=thumbnail_template
//--------------loading------------------------ 
    this.IsotopeInit=function(){
        var iso_settings={
                itemSelector:".thumbnail-card",
                masonry:{
                    columnWidth:'.grid-sizer',
                    gutter:'.gutter-sizer',
                    stagger:10
                    //isfitwidth:true
                },
                getSortData:{
                    target:'[data-sort]'
                },
                sortBy:'target'
                
                };
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
        }.bind(this)

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
                thumb.find('.thumbnail-image')
                    .find('img')
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
            error:function(result){
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

        console.log(url_function())
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
//-----------------------------opening--------------
    this.open=function(id){  
        var card=jQuery(id)
        var others=card.parent().find('.thumbnail-full').not(card)
      
        others.toggleClass('thumbnail-full')
        others.toggleClass('thumbnail-small')
         
        card.toggleClass('thumbnail-full')
        card.toggleClass('thumbnail-small')
        this.resize()
    }.bind(this)
//-----------------------------viewing-------------- 
    this.viewing_id=null
    this.toggle_view=function(id){
        var card=null
        if(id){
            this.viewing_id=id
            card=jQuery(id)
            card.removeClass('thumbnail-full')
            card.removeClass('thumbnail-small')
            card.addClass('post-view')
        }else{
            card=jQuery(this.viewing_id)
            this.viewing_id=null
            card.removeClass('thumbnail-full')
            card.addClass('thumbnail-small')
            card.removeClass('post-view')
        }
        this.iso.layout()
    }.bind(this)

}

module.exports=posts
