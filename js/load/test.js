var load=require('./load.js')

load("/load/data/page_1.html")   
    .then(function(){
        return(load("/load/data/page_2.html"))
    }).then(function(){
        return(load("/load/data/not_here.html"))  
    }).then(
        function(){},
        function(){
            jQuery('main').attr('id','done')
        }
    )
