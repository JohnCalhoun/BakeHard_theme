var jQuery=require('jquery-browserify')
var constants={
        base_url:'/menus/data/',
    }
var template=function(obj){
    return("<p id='test'>"+obj[0].id+"</p>")
}
var menus=require('./menus.js')
jQuery(window).ready(function(){
    window.menu_test=new menus(constants,'menu')
    window.menu_test.render_insert('.menus',template) 
    
    window.menu_test.get_ids().then(function(a){
        window.ids=a
    })
    window.menu_test.ready.then(function(){
        jQuery('main').append(jQuery("<p id='done'></p>")) 
        })
})

