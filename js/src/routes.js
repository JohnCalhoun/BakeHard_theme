goog.provide('bakehard.routes')

goog.require('bakehard.swap')

page(   "/page/:source_id/:target_id/:path(*)",
        function(ctx,next){
            bakehard.swap(  ctx.params.path, 
                            ctx.params.source_id,
                            ctx.params.target_id)
            next()
        }
)

page(   "/post/thumb/:path(*)",
        function(ctx,next){
            next()
        }
)

page(   "/post/full/:path(*)",
        function(ctx,next){
            next()
        }
)
