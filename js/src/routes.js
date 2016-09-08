goog.provide('bakehard.routes')

goog.require('bakehard.render.page')
goog.require('bakehard.render.post')
goog.require('bakehard.render.thumbnail')
goog.require('goog.uri.utils');

$(document).ready(
    var url=window.location.href
    page.base(goog.uri.utils.getPath(url))
)

bakehard.routes.page=function(ctx,next){
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

page("/page/:source_id/:target_id/:path(*)",bakehard.routes.page)
page("/post/post/:path(*)",bakehard.routes.post)
page("/thumbnail/:per_page/:page/:url(*)",bakehard.routes.thumbnail)
