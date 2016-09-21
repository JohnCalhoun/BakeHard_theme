(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var navigate=function(constants){
    var out=function(e){    
        var path=jQuery(e.target).attr('href')
        
        if(path.indexOf(constants.site_url) != -1){
            e.preventDefault()  
            jQuery('main').trigger('change_page',path) 
        }
    } 
    return(out)
}
module.exports=navigate

},{}],2:[function(require,module,exports){
var constants={
    site_url:"/nav/data"
    }

var nav=require('./nav.js')(constants)

jQuery(document).ready(function(){
    jQuery('.nav a').on('click',
        function(e){
            e.preventDefault() 
            nav(e)
        })
    jQuery(window).on('change_page',
        function(e,path){
            jQuery('main').attr('id','done')
            jQuery('main').append(path)
        })
    jQuery('main').attr('id','ready')
})

},{"./nav.js":1}]},{},[2]);
