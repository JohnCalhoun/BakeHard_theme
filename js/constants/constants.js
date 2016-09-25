var init=function(resolve,reject){
    var link=jQuery( 'link[rel="https://api.w.org/"]' )
    var site_url=jQuery( 'meta[name="site_url"]' )
    var sticky_posts=jQuery( 'meta[name="sticky_posts"]' )
   
    if(link){
        this.base_url=link.attr('href')
    }else{
        reject(Error('no link'))
    }
    
    if(site_url){
        this.site_url=site_url.attr('content')+'/'
    }else{
        reject(Error('no site_url'))
    } 
     
    if(sticky_posts){
        this.sticky_posts=JSON.parse(sticky_posts.attr('content'))
    }else{
        reject(Error('no sticky_posts'))
    }

    this.api_url        =this.base_url+"wp/v2/"
    this.bh_api_url     =this.base_url+"bakehard/v1/"
    this.post_per_page  =10 
    resolve()
}

var build=function(){
    var intialize=new Promise(init.bind(this))
    this.ready=intialize     
}

module.exports=build
