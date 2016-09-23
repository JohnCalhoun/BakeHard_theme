//---------------------------core functions----------------
jQuery(document).ready(function(){
    var constants_mod=require('./constants/constants.js')
    var constants=new constants_mod()

    constants.ready.then(function(){
        var nav=require('./nav/nav.js')(constants)
        jQuery('.nav a').on('click',function(e){
            nav(e)
            jQuery('.nav li').removeClass('active') 
            jQuery(e.target).parent().addClass('active')
        })

        var load=require('./load/load.js')
   
        var thumbnails=require('./thumbnails/thumbnails.js')
        var JST=require('./templates/templates.js')
        //-------------------------initial pages--------------------
        var loading_func=JST['js/templates/mustache/load.mustache'] 
      
        jQuery('main').append(jQuery(
            JST['js/templates/mustache/home.mustache'](
                {url:constants.site_url}
            )
        ))
        jQuery('main').append(jQuery(
            JST['js/templates/mustache/blog.mustache'](
                {url:constants.site_url,
                loading:"<div class='valign-wrapper'>"+loading_func({type:"blog"})+"</div>"
                })
        ))
        
        jQuery('.content').filter('.home a').on('click',nav)
        jQuery('.content').filter('.blog a').on('click',nav)
       
        jQuery('main').append(jQuery(
            loading_func({type:'main'})
        ))
         
        //-------------------------thumbnails--------------------
       
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
            post_thumbnails.load_new()
        })

        jQuery('main').on('page_ready','.content',
            function(){
                post_thumbnails.IsotopeInit()
                page_thumbnails.IsotopeInit()
            })
        //-------------------------progress----------------------- 
        var progress=require('./progress/progress.js')
       
        jQuery(window).on('page_rendering',
                    progress.start(
                        '#loading-main',
                        'main',
                        null
                    )
        )  
        jQuery(window).on('page_rendered',
                    progress.stop('#loading-main')
        ) 
        jQuery(window).on('thumbnail_rendering',
                    progress.start(
                        '#loading-blog',
                        'main',
                        null
                    )
        )  
        jQuery(window).on('thumbnail_rendered',
                    progress.stop('#loading-blog')
        ) 
     
        //-------------------routing

        var routes_con=require('./routes/routes.js')
        var routes=new routes_con(load) 
        
        routes.check_and_go() 
        jQuery(window).on(  'popstate',
                            routes.check_and_go)
       
        jQuery('main').on(  
            'change_page',
            routes.on_change_page
        )

    })
})
