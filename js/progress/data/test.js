(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var progress={}

progress.start=function(id,selector,template){
    return(function(e,cached){
        var screen=jQuery(id)
        if( screen.length ==0 ){
            jQuery(selector)
                .append(template())
        }
        screen.show()
    })
}

progress.stop=function(id){
    return(function(){
        jQuery(id).hide()
    })
}

module.exports=progress


},{}],2:[function(require,module,exports){
var progress=require('./progress.js')

var template=function(){
    return(
        "<p id='progress'>test</p>"
    )
}

window.progress_start=progress.start('#progress','main',template)

window.progress_stop=progress.stop('#progress','main',template)

},{"./progress.js":1}]},{},[2]);
