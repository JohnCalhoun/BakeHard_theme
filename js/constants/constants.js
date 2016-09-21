var init=function(resolve,reject){
    var link=jQuery( 'link[rel="https://api.w.org/"]' )
   
    if(link){
        this.base_url=link.attr('href')
    }else{
        reject(Error('no link'))
    }
       
    this.api_url        =this.base_url+"wp/v2/"
    this.bh_api_url     =this.base_url+"bakehard/v1/"
    this.post_per_page  =10 

    jQuery.ajax({
            url:this.bh_api_url+'site_url',
            dataType:'json',
            success:function(url){
                this.site_url=url+'/'
                resolve()
            }.bind(this),
            error:function(){
                reject(Error('ajax failed'))
            }
    })
}

var build=function(){
    this.ready=new Promise(init.bind(this))
}

module.exports=build
