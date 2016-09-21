//---------------------------core functions----------------
jQuery(document).ready(function(){
    var constants_mod=require('./constants/constants.js')
    var constants=new constants_mod()

    constants.ready.then(function(){
        var nav=require('./nav/nav.js')(constants)
        jQuery('.nav a').on('click',nav)

        var load=require('./load/load.js')

        var routes_con=require('./routes/routes.js')
        var routes=new routes_con(load) 
         
        var progress=require('./progress/progress.js')
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
                loading:loading_func({type:"blog"})
                })
        ))
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
        
        jQuery('.load-posts').on('click',function(){
            post_thumbnails.load_new()
        })

        jQuery('main').on('page_ready','.content',
            function(){
                post_thumbnails.IsotopeInit()
                page_thumbnails.IsotopeInit()
            })

        //-------------------------progress--------------------
    })
})
