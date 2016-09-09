goog.provide('bakehard.routes')

goog.require('bakehard.render.page')
goog.require('bakehard.render.thumbnail')
goog.require('goog.uri.utils');

jQuery(document).ready(
    function(){
        var url=window.location.href;
        page.base(goog.uri.utils.getPath(url))
        page({hashbang:true})
    }
)

bakehard.routes.page=function(ctx,next){
    console.log(ctx)
    bakehard.render.page.load(ctx)
    next()
}

bakehard.routes.post=function(ctx,next){
    bakehard.render.post.load(ctx)
    next()
}

bakehard.routes.thumbnail=function(ctx,next){
    bakehard.render.thumbnail.load(ctx)
    next()
}

bakehard.routes.init=function(ctx,next){
    ctx.cache=ctx.cache||{};
    ctx.cache.pages=ctx.cache.pages||{};
    ctx.cache.post_pages=ctx.cache.post_pages||{};
    ctx.cache.posts=ctx.cache.posts||{};

    next()
}

page("/*",bakehard.routes.init)
page("/page/:target_id/:source_id/*",bakehard.routes.page)
page("/thumbnail/:per_page/:page/:url",bakehard.routes.thumbnail)



