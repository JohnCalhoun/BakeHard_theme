var Isotope=require('isotope-layout')
var jQuery=require('jquery-browserify')

var posts=function(constants,thumbnail_template){
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
                },
                getSortData:{
                    target:'[data-sort]'
                }
                
                };
        this.iso=new Isotope(
            '.thumbnail',
            iso_settings
        );
    }.bind(this)

    this.api_url=function(page){
        var url=constants.api_url+'posts'+"?page="+page+"&per_page="+constants.post_per_page
        return(url)
    }

    this.emit=function(name,args){
        jQuery(document).trigger(name,args)
    }
    
    this.render=function(posts){  
        var elems=[]
        jQuery.each(    
            posts,
            function(index,post){
                elems.push(        
                    jQuery(this.thumbnail_template(post))[0]
                )
            }.bind(this)
        )
        this.iso.insert(elems)

        this.emit('thumbnail_rendered',["success"])
    }.bind(this)

    this.load=function(page){
        jQuery.ajax({   
            url:this.api_url(page),
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
                this.current_page++
            }.bind(this),
            error:function(result){
                this.emit('thumbnail_rendered',["fail"])
            }.bind(this),
            complete:function(){
                this.emit('thumbnail_progress',{"percent":100})
            }.bind(this)
        })
    }.bind(this)
   
    this.load_new=function(){
        this.load(this.current_page)
    }.bind(this)

//----------------------------------filtering
    this.filter_array=[]

    this.apply_filter=function(){
        this.iso.arrange({filter:this.filter_array.join(', ')})
    }.bind(this)

    this.add_filter=function(type){
        var sel='.'+type
        
        if( this.filter_array.indexOf(sel) === -1){
            this.filter_array.push(sel)
            this.apply_filter()
        }
    }.bind(this)
    
    this.remove_filter=function(type){
        var sel='.'+type
        var pos=this.filter_array.indexOf(sel)
        if(pos !== -1){
            this.filter_array.splice(pos,1)
        } 
        this.apply_filter()
    }.bind(this)
//-----------------------------sorting 
    this.sort=function(){
        this.iso.arrange({sortBy:'target'}) 
    }.bind(this)
}

module.exports=posts
