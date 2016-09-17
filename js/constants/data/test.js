(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var init=function(resolve,reject){
    var link=jQuery( 'link[rel="https://api.w.org/"]' )
   
    if(link){
        this.base_url=link.attr('href')
    }else{
        reject(Error('no link'))
    }
       
    this.api_url        =this.base_url+"wp/v2/"
    this.bh_api_url     =this.base_url+"bh/v1/"
    this.post_per_page  =10 

    jQuery.ajax({
            url:this.api_url+'site_url',
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

},{}],2:[function(require,module,exports){
var constants_tmp=require('./constants.js')

var constants=new constants_tmp()

constants.ready.then(function(){
    window.constants_test=constants 
    jQuery('main').append('<div id="done"></div>')
})

},{"./constants.js":1}]},{},[2]);
