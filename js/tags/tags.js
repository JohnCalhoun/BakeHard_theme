var init=function(constants,template,selector){
    this.api_url=function(){
        return(constants.api_url+'categories?hide_empty=true&per_page=100') 
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
            var parents=jQuery.grep(data,function(category){
                return(category.parent === 0) 
            }) 
            
            for(i=0;i<parents.length;i++){
                parents[i]['children']=new Array()
            }
            
            var children=jQuery.grep(data,function(category){
                return(category.parent !== 0) 
            })
            
            for(i=0;i<children.length;i++){
                var parentID=children[i].parent
                var parent=jQuery.grep(parents,function(par){
                    return(par.id === parentID)
                })
                if(parent[0]){
                    parent[0].children.push(children[i])
                }
            }
            var out=jQuery(template({categories:parents}) )
            
            
            resolve(out)
        })
        return(out)
    }.bind(this)

    this.insert=function(element){
        var out=new Promise(function(resolve,reject){ 
            jQuery(selector).append(element)
            jQuery('.collapsible').collapsible()
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
