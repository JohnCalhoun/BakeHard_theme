var routes_mod=require('./routes.js')
var routes=new routes_mod()

routes.register('/:foo',function(bar){
        jQuery('main').append('<div id="target">'+bar+'</div>')
    })

jQuery(window).on('popstate',routes.onHashChange)

jQuery(window).ready(function(){
    routes.check_hash()
    jQuery('.link-button').click(function(e){
        history.pushState(null,null,'#'+jQuery(e.target).attr('data-href'))
        routes.check_hash()
    })
})
