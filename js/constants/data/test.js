(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    resolve()
}

var get_site_url=function(resolve,reject){
    jQuery.ajax({
            url:this.bh_api_url+'site_url',
            dataType:'json',
            success:function(url){
                this.site_url=url+'/'
                resolve()
            }.bind(this),
            error:function(){
                reject(Error('ajax failed: get_site_url'))
            }
    })
}

var get_stick_posts=function(resolve,reject){
    jQuery.ajax({
            url:this.bh_api_url+'sticky_posts',
            dataType:'json',
            success:function(posts){
                this.sticky_posts=posts
                resolve()
            }.bind(this),
            error:function(){
                reject(Error('ajax failed:get_sticky_posts'))
            }
    })
}

var build=function(){
    var intialize=new Promise(init.bind(this))
    var url=new Promise(get_site_url.bind(this))
    var sticky=new Promise(get_stick_posts.bind(this))

    this.ready=intialize.then(
        function(){
            var out=Promise.all([url,sticky]) 
            return(out)
        })

    

}

module.exports=build

},{}],2:[function(require,module,exports){
var constants_tmp=require('./constants.js')

var constants=new constants_tmp()

constants.ready.then(function(){
    window.constants_test=constants 
    jQuery('main').append('<div id="done"></div>')
})

},{"./constants.js":1}]},{},[2]);
