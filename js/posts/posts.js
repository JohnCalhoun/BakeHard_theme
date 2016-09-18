var Isotope=require('isotope-layout')
var jQuery=require('jquery-browserify')

var posts=function(constants,thumbnail_template){
    this.current_page=1
    this.filter=[]
    this.thumbnail_template=thumbnail_template

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
        console.log(elems)
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
    
    this.IsotopeInit=function(){
        var iso_settings={
                itemSelector:".thumbnail-card",
                masonry:{
                    //columnWidth:'.grid-sizer',
                    //gutter:'.gutter-sizer',
                    stagger:10
                }};
        this.iso=new Isotope(
            '.thumbnail',
            iso_settings
        );

    }.bind(this)

    this.load_new=function(){
        this.load(this.current_page)
    }.bind(this)

    this.filter_category=
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
            jQuery(".thumbnail").Isotope(
                {filter:filter_string}
            );
        }.bind(this)
}

module.exports=posts
