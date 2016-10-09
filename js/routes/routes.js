var pathToRegex=require('path-to-regexp')

var routes=function(){
    this._current=''
    this._routes=[]
    window.routes=this
    this.register=function(path,fn){
        var reg=pathToRegex(path,[])
        this._routes.push(
            {   regex:reg,
                func:fn}
            )
    }.bind(this)
     
    this.dispatch=function(path){
        for(var i=0; i<this._routes.length;i++){
            var route=this._routes[i]
            
            var match=route.regex.exec(path)
            if(match){
                route.func.apply(this,match.splice(1))
            }
        }
    }.bind(this)
    this.redirect=this.dispatch
    this.check_hash=function(){
        if( window.location.hash !=this._current){
            this.dispatch(window.location.hash.substring(1))
            this._current=window.location.hash
        }else if(window.location.hash === ''){
            window.location.hash='#/'
            this.check_hash()
        }
    }.bind(this)
   
    this.onHashChange=this.check_hash
}

module.exports=routes
