goog.provide('bakehard.render.post');

bakehard.render.post.find_post=function(ctx){}
bakehard.render.post.render=function(ctx){
    //string to html
    //clear post area
    //put in area
}

bakehard.render.post.load=function(ctx){
    post=bakehard.render.post.find_post(ctx.stat.posts)

    if(post){  
        bakehard.render.post.render(post) 
    }else{
        //get post
        //make ajax call
    }
};


