//---------------------------core functions----------------
jQuery(document).ready(function(){
    var constants_mod=require('./constants/constants.js')
    var constants=new constants_mod()

    constants.ready.then(function(){
        jQuery('.nav a').on('click',function(e){
            jQuery('.nav li').removeClass('active') 
            jQuery(e.target).parent().addClass('active')
        })
   
        //-------------------------initial pages--------------------
        var JST=require('./templates/templates.js')
        var pages_url=constants.site_url+'Pages' 
        var posts_url=constants.site_url+'Posts' 

        jQuery('main').append(jQuery(
            JST['js/templates/mustache/home.mustache']()
        ))
        jQuery('main').append(jQuery(
            JST['js/templates/mustache/blog.mustache']()
        ))
         
        //-------------------------thumbnails--------------------
        var thumbnails=require('./thumbnails/thumbnails.js')
        var page_thumbnails=new thumbnails(
                        constants,
                        JST['js/templates/mustache/page_thumbnail.mustache'],
                        '.page-thumbnails',
                        'pages'
        )
        page_thumbnails.IsotopeInit()
        page_thumbnails.load_all()  
       
        var post_thumbnails=new thumbnails(
                        constants,
                        JST['js/templates/mustache/post_thumbnail.mustache'],
                        '.post-thumbnails',
                        'posts'
        )
        post_thumbnails.IsotopeInit()
        post_thumbnails.load_new()
        post_thumbnails.load_id(constants.sticky_posts)

        var tags=require('./tags/tags.js')
        var category_tags=new tags(
                        constants,
                        JST['js/templates/mustache/cat_tag.mustache'],
                        ".category-tags"); 
        category_tags.load()  

        jQuery('.load-posts').on('click',function(){
            var progress=jQuery('.blog .progress')
            progress.show() 
            post_thumbnails.load_new()
            jQuery(document).one('thumbnail_rendered',function(){
                progress.hide() 
            })
        })

        window.thumb=post_thumbnails 

        jQuery('.post-thumbnails').on( 'click',    
                            '.thumbnail-card',
                            function(e){  
                                var id=jQuery(e.target).closest('.thumbnail-card').attr('id')
                                post_thumbnails.open('#'+id)
                            })

        jQuery('.page-thumbnails').on( 'click',    
                            '.thumbnail-card',
                            function(e){  
                                var id=jQuery(e.target).closest('.thumbnail-card').attr('id')
                                history.pushState(null,null,'#/pages/'+id)
                                routes.onHashChange()
                            })
        //-------------------routing
        var routes_con=require('./routes/routes.js')
        var routes=new routes_con() 

        var main=jQuery('main')
        var page_show=function(id){
            main.children().not(id).hide()  
            main.children(id).show()  
        }
        routes.register('/front',function(){
            page_show('#front-page') 
        })

        routes.register('/posts',function(){
            page_show('#posts') 
            post_thumbnails.iso.arrange({filter:'*'}) 
            post_thumbnails.IsotopeInit()
            post_thumbnails.iso.arrange()
            post_thumbnails.iso.arrange()
            jQuery('.blog-load').show()
            jQuery('.controls').show()
            post_thumbnails.toggle_view()
        })
        routes.register('/posts/filter/:Filter',function(Filter){
            post_thumbnails.iso.arrange({filter:Filter}) 
        })
        routes.register('/posts/:id',function(id){
            post_thumbnails.iso.arrange({filter:'#'+id}) 
            post_thumbnails.toggle_view('#'+id)
            jQuery('.blog-load').hide()
            jQuery('.controls').hide()
        })
        
        routes.register('/pages',function(){
            page_show('#pages') 
            page_thumbnails.iso.arrange({filter:'*'}) 
            page_thumbnails.IsotopeInit()
            page_thumbnails.iso.arrange()
            page_thumbnails.iso.arrange()
            page_thumbnails.toggle_view()
        })
        routes.register('/pages/:id',function(id){
            page_thumbnails.iso.arrange({filter:'#'+id}) 
            page_thumbnails.toggle_view('#'+id)
        })

        routes.onHashChange() 
        jQuery(window).on('popstate',routes.onHashChange)
        jQuery('body').on(
            'click',
            '.link-button',
            function(e){
                e.stopPropagation()
                e.preventDefault()
                history.pushState(null,null,'#'+jQuery(e.target).attr('href'))
                routes.onHashChange()
            }
        )
    })
})





