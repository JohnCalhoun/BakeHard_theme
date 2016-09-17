var Promise=require('promise-polyfill')
console.log(Promise)
var constants_tmp=require('./constants.js')

var constants=new constants_tmp()

constants.ready.then(function(){
    window.constants_test=constants 
    jQuery('main').append('<div id="done"></div>')
    console.log('hi')
})
