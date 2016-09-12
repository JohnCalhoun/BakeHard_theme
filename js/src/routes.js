goog.provide('bakehard.routes')

goog.require('bakehard.render.page')
goog.require('bakehard.render.thumbnail')
goog.require('goog.uri.utils');

jQuery(document).ready(
    function(){
        var url=window.location.href;
        page.base(goog.uri.utils.getPath(url))
        page(
            {hashbang:true,
            popstate:true}
        )
    }
)

bakehard.routes.page=function(ctx,next){
    bakehard.render.page.load(ctx)
    next()
}

bakehard.routes.init=function(ctx,next){
    ctx.cache=ctx.cache||{};
    ctx.cache.pages=ctx.cache.pages||{};
    ctx.cache.post_pages=ctx.cache.post_pages||{};
    ctx.cache.posts=ctx.cache.posts||{};

    jQuery(document).trigger('new_page') 
    next()
}
page("/*",bakehard.routes.init)
page("/page/*",bakehard.routes.page)


