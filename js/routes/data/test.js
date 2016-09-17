(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var routes=function(page_render){
    this.current=''

    check_and_go=function(){
        if( window.location.hash !=this.current){
            page_render(window.location.hash.substring(1))
        }
    }.bind(this)
    
    jQuery(window).on(  'popstate',
                        check_and_go)

    jQuery(window).ready(   check_and_go)


    jQuery(window).on(  
        'change_page',
        function(e,path){
            page_render(path)
            this.current='#'+path
            history.pushState(  null,
                                null,
                                '#'+path)
        }.bind(this)
    )
}

module.exports=routes

},{}],2:[function(require,module,exports){
var routes=require('./routes.js')


},{"./routes.js":1}]},{},[2]);
