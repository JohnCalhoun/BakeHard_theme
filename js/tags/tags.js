var init=function(constants,template,selector){
    this.api_url=function(){
        return(constants.api_url+'categories') 
    }.bind(this)

    this.get=function(){
        var out=new Promise(function(resolve,reject){
            jQuery.ajax({
                url:this.api_url(),
                dataType:'json',
                success:function(response){
                    resolve(response)
                },
                error:function(result){
                    reject(Error('ajax failed'))
                },
            })
        }.bind(this))
        return(out)
    }.bind(this)

    this.render=function(data){
        var out=new Promise(function(resolve,reject){
            var out=jQuery(template(data) )
            resolve(out)
        })
        return(out)
    }.bind(this)

    this.insert=function(element){
        var out=new Promise(function(resolve,reject){ 
            jQuery(selector).append(element)
            resolve()
        })
        return(out)
    }.bind(this)
    
    this.load=function(){
        this.get()
            .then(this.render)
            .then(this.insert)
    }.bind(this)
}
module.exports=init;
