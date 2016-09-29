var glob = ('undefined' === typeof window) ? global : window,

Handlebars = glob.Handlebars || require('handlebars');

this["JST"] = this["JST"] || {};

this["JST"]["js/templates/mustache/blog.mustache"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class='content' id='posts' style='display:none;'>\n    <div class='category-tags'></div>\n    <div class='post-thumbnails content-thumbnail'>\n        <div class='grid-sizer'></div>\n        <div class='gutter-sizer'></div>\n    </div>\n    <div class='blog-load'>\n        <span class='btn load-posts'>Load More</span>\n    </div>\n    <div class='loading-blog progress' style='display:none;'>\n        <div class='indeterminate'></div> \n    </div>\n</div>\n\n";
},"useData":true});

this["JST"]["js/templates/mustache/cat_tag.mustache"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <li>\n            <span class='category-tag' data-cat='"
    + alias2(alias1((depth0 != null ? depth0.slug : depth0), depth0))
    + "'>\n                <a class='link-button' href='/posts/filter/."
    + alias2(alias1((depth0 != null ? depth0.slug : depth0), depth0))
    + "'> \n                    "
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\n                </a>\n            </span>\n        </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class='category-list'>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.categories : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true});

this["JST"]["js/templates/mustache/home.mustache"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class='content' id=\"pages\" style='display:none;'>\n    <div class='page-thumbnails content-thumbnail'>\n        <div class='grid-sizer'></div>\n        <div class='gutter-sizer'></div>\n    </div>\n</div>\n\n";
},"useData":true});

this["JST"]["js/templates/mustache/load.mustache"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"content loading-"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + " loading hide\" id=\"loading-"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\" style='display:none;'>\n     <div class=\"progress\">\n        <div class=\"indeterminate\"></div> \n    </div> \n</div>\n\n";
},"useData":true});

this["JST"]["js/templates/mustache/page_thumbnail.mustache"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "thumbnail-image";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <img class='thumbnail-image' src='"
    + container.escapeExpression(((helper = (helper = helpers.img_url || (depth0 != null ? depth0.img_url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"img_url","hash":{},"data":data}) : helper)))
    + "'>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div id='"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "' class=\"thumbnail thumbnail-small "
    + alias4(((helper = (helper = helpers.category_string || (depth0 != null ? depth0.category_string : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category_string","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.img_url : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.img_url : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"thumbnail-title\">\n        <span class=\"thumbnail-title activate\"> "
    + ((stack1 = alias5(((stack1 = (depth0 != null ? depth0.title : depth0)) != null ? stack1.rendered : stack1), depth0)) != null ? stack1 : "")
    + " </span>\n    </div>\n    <div class=\"thumbnail-excerpt\">\n        <a class='btn page-view-button link-button' href='/pages/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "' >View</a>\n    </div>\n    <div class=\"thumbnail-content\">\n        "
    + ((stack1 = alias5(((stack1 = (depth0 != null ? depth0.excerpt : depth0)) != null ? stack1.rendered : stack1), depth0)) != null ? stack1 : "")
    + "\n    </div>\n</div>\n\n";
},"useData":true});

this["JST"]["js/templates/mustache/post_thumbnail.mustache"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "thumbnail-image";
},"3":function(container,depth0,helpers,partials,data) {
    return "1";
},"5":function(container,depth0,helpers,partials,data) {
    return "0";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <img src='"
    + container.escapeExpression(((helper = (helper = helpers.img_url || (depth0 != null ? depth0.img_url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"img_url","hash":{},"data":data}) : helper)))
    + "' class=\"feature-image\">\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "";
},"11":function(container,depth0,helpers,partials,data) {
    return "            <li> "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + " </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div id='"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "' class=\"thumbnail thumbnail-small "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.img_url : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias4(((helper = (helper = helpers.category_string || (depth0 != null ? depth0.category_string : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category_string","hash":{},"data":data}) : helper)))
    + "\" data-sticky='"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.sticky : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "'>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.img_url : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "    <div class=\"thumbnail-title\">\n        "
    + ((stack1 = alias5(((stack1 = (depth0 != null ? depth0.title : depth0)) != null ? stack1.rendered : stack1), depth0)) != null ? stack1 : "")
    + " \n    </div>\n    <div class=\"thumbnail-excerpt\">\n        "
    + ((stack1 = alias5(((stack1 = (depth0 != null ? depth0.excerpt : depth0)) != null ? stack1.rendered : stack1), depth0)) != null ? stack1 : "")
    + "\n        <ul class='tag-list'>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.tag_strings : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n        <div class='post-view-button' >\n            <a class='btn link-button' href='/posts/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "' >View</a>\n        </div>\n    </div>\n    <div class=\"thumbnail-content\">\n        <h2>"
    + ((stack1 = alias5(((stack1 = (depth0 != null ? depth0.title : depth0)) != null ? stack1.rendered : stack1), depth0)) != null ? stack1 : "")
    + "</h2>\n        <hr>\n        "
    + ((stack1 = alias5(((stack1 = (depth0 != null ? depth0.content : depth0)) != null ? stack1.rendered : stack1), depth0)) != null ? stack1 : "")
    + "\n    </div>\n</div>\n\n";
},"useData":true});

if (typeof exports === 'object' && exports) {module.exports = this["JST"];}