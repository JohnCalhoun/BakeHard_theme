var menu=function(constants,menu_location){
    var menu_url=constants.base_url+"wp-api-menus/v2/menu-locations/"+menu_location

    this.ready=new Promise(function(resolve,reject){
        jQuery.ajax({
            url:menu_url,
            dataType:'json',
            success:function(response){ 
                resolve(response)
            },
            error:function(result){
                reject(Error('ajax failed'))
            },
        })
    })
    this.render_insert=function(selector,template){
        this.ready
            .then(function(menu_object){
                jQuery(selector).append(jQuery(template(menu_object))) 
            })
    }.bind(this)

    this.get_ids=function(){
        var out=this.ready
            .then(function(menu_object){
                var ids=new Array()
                 
                var dive=function(input){
                    for(var i=0;i<input.length;i++){
                        ids.push(input[i].object_id)
                        dive(input[i].children)
                    }
                }
                dive(menu_object)
                return(ids)
            })
        return(out)
    }.bind(this)
}

module.exports=menu























