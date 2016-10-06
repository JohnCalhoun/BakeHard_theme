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
        //-------------------------bourbon------------------------ 
        var bourbon=require('./bourbon/bourbon.js')
        //-------------------------thumbnails--------------------
        var thumbnails=require('./thumbnails/thumbnails.js')
        var page_thumbnails=new thumbnails(
                        constants,
                        JST['js/templates/mustache/page_thumbnail.mustache'],
                        '.page-thumbnails',
                        'pages'
        )
        page_thumbnails.IsotopeInit()
        var page_load_promise=page_thumbnails.load_all()  
       
        var post_thumbnails=new thumbnails(
                        constants,
                        JST['js/templates/mustache/post_thumbnail.mustache'],
                        '.post-thumbnails',
                        'posts'
        )
        post_thumbnails.IsotopeInit()
        var post_load_promise=post_thumbnails.load_new()
        var post_load_sticky_promise=post_thumbnails.load_id(constants.sticky_posts)

        jQuery('.load-posts').on('click',function(){
            var progress=jQuery('.loading-blog.progress')
            progress.show() 
            post_thumbnails.load_new()
            jQuery(document).one('thumbnail_rendered',function(){
                progress.hide() 
            })
        })
        
        jQuery('.post-thumbnails').on( 'click',    
                            '.thumbnail-container:has(.thumbnail-small,.thumbnail-medium)',
                            function(e){  
                                var id=jQuery(e.target)
                                            .filter(':not(a)')
                                            .closest('.thumbnail-container') 
                                            .attr('id')
                                post_thumbnails.open('#'+id)
                            })
        jQuery('.page-thumbnails').on( 'click',    
                            '.thumbnail',
                            function(e){  
                                var id=jQuery(e.target).closest('.thumbnail').attr('id')
                                history.pushState(null,null,'#/pages/'+id)
                                routes.onHashChange()
                            })
        //--------------------------------menus--------------------
        var menu=require('./menus/menus.js') 
      
        var menu_blog=new menu(constants,"Blog")
        menu_blog.render_insert('.category-tags',
                    function(obj){
                        return(JST['js/templates/mustache/category_menu.mustache']({categories:obj})  )    
                            })

        var menu_home=new menu(constants,"Home") 
        menu_home.get_ids().then(function(ids){
            var selector='#'+ids.join(',#')
            page_thumbnails.filter(selector)
        })        
        
        //-------------------routing
        var routes_con=require('./routes/routes.js')
        var routes=new routes_con() 

        var main=jQuery('main')
        var page_show=function(id){
            main.children().not(id).hide()  
            main.children(id).show()  
        }
            //------------front
        routes.register('/front',function(){
            page_thumbnails.initialized=false 
            post_thumbnails.initialized=false 
            page_show('#front-page') 
        })
            //------------posts
        routes.register('/posts',function(){
            page_thumbnails.initialized=false 
            page_show('#posts') 
            jQuery('.post-thumbnails .thumbnail-container')
                .not('.thumbnail-container-full')
                .children('.thumbnail')
                .addClass('thumbnail-small')
                .removeClass('thumbnail-medium')
                .removeClass('thumbnail-full')

            jQuery('.post-thumbnails .thumbnail-container-full .thumbnail')
                .removeClass('thumbnail-full')
                .addClass('thumbnail-medium')
                
            post_thumbnails.iso.arrange({
                filter:post_thumbnails.filter_string
            })
            post_thumbnails.IsotopeInit()

            jQuery('.blog-load').show()
            jQuery('.controls').show()
            jQuery('.category-list').show()
        })
        routes.register('/posts/filter/:Filter',function(Filter){
            routes.redirect('/posts')
            post_thumbnails.iso.arrange({filter:Filter}) 
        })
        routes.register('/posts/:id',function(id){
            routes.redirect('/posts')
            Promise.all([
                post_load_promise,
                post_load_sticky_promise]).then(function(){
                    var container=jQuery('#'+id)
                    container.addClass('thumbnail-container-full')
                        .css('height','') 
                        .children('.thumbnail')
                        .addClass('thumbnail-full')
                        .removeClass('thumbnail-small')
                        .removeClass('thumbnail-medium')
                        .css('height','')
                        .css('width','')
                    
                    if(post_thumbnails.stamp_card){
                        post_thumbnails.iso.unstamp(container)
                    }
                    post_thumbnails.iso.arrange({filter:'#'+id})  
                    jQuery('.blog-load').hide()
                    jQuery('.controls').hide()
                    jQuery('.category-list').hide()
                }) 
        })
            //------------page
        routes.register('/pages',function(){
            post_thumbnails.initialized=false 
            page_show('#pages') 
            jQuery('.page-thumbnails .thumbnail')
                .removeClass('thumbnail-full')
                .addClass('thumbnail-small')
            
            page_thumbnails.iso.arrange({
                filter:page_thumbnails.filter_string
            })
            page_thumbnails.IsotopeInit()
        })
        routes.register('/pages/:id',function(id){
            routes.redirect('/pages')
            page_load_promise.then(function(){
                jQuery('#'+id)
                    .removeClass('thumbnail-small')
                    .addClass('thumbnail-full')
                page_thumbnails.iso.arrange({filter:'#'+id}) 
            }) 
        })

        routes.onHashChange() 
        jQuery(window).on('popstate',function(){
            routes.onHashChange()
            })
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





