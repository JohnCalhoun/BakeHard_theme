goog.provide('bakehard.view')

bakehard.view.clear=function(url){

};
bakehard.view.get=function(page){

};
bakehard.view.insert=function(element){

};
bakehard.view.extract=function(data,element){

};

bakehard.view.render=function(url,element){
    var page=bakehard.view.get(url);
    var data=bakehard.view.extract(page);

    bakehard.view.clear(element);
    bakehard.view.insert(data,element);
};
