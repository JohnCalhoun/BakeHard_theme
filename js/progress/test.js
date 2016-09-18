var progress=require('./progress.js')

var template=function(){
    return(
        "<p id='progress'>test</p>"
    )
}

window.progress_start=progress.start('#progress','main',template)

window.progress_stop=progress.stop('#progress','main',template)
