var constants=require('./constants/constants.js')
var load=require('./load/load.js')
var nav=require('./nav/nav.js')
var pages=require('./pages/pages.js')
var progress=require('./progress/progress.js')
var posts=require('./posts/posts.js')
var routes=require('./routes/routes.js')
var templates=require('./templates/templates.js')


jQuery(document).on('click','.nav,.a',function(e){
    var element=jQuery(e.target).parent()
    var nav=element.parent()

    nav.find('.active').removeClass('active')
    element.addClass('active')
})
