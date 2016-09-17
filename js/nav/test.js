var constants={
    base_url:"/nav/data"
    }

var nav=require('./nav.js')(constants)

jQuery(document).ready(function(){
    jQuery('.nav a').on('click',
        function(e){
            nav(e)
        })
    jQuery(window).on('change_page',
        function(e,path){
            jQuery('main').attr('id','done')
            jQuery('main').append(path)
        })
    jQuery('main').attr('id','ready')
})
