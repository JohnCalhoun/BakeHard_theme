var glob = ('undefined' === typeof window) ? global : window,

Handlebars = glob.Handlebars || require('handlebars');

this["JST"] = this["JST"] || {};

this["JST"]["js/templates/mustache/blog.mustache"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function";

  return "<div class='content blog' data-url='"
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "' style='display:none;'>\n\n    <div class='controls'>\n        <ul class='collapsible' data-collapsible=\"accordian\">\n            <li> \n                <div class='collapsible-header'>Categories</div>\n                <div class='category-tags collapsible-body'></div>\n            </li>\n        </ul>\n    </div>\n    <div class='post-thumbnails content-thumbnail'>\n        <div class='grid-sizer'></div>\n        <div class='gutter-sizer'></div>\n    </div>\n    <div>\n        <span class='btn load-posts'>Load More</span>\n    </div>\n    "
    + ((stack1 = ((helper = (helper = helpers.loading || (depth0 != null ? depth0.loading : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"loading","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n\n</div>\n\n";
},"useData":true});

this["JST"]["js/templates/mustache/cat_tag.mustache"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "        <li>\n            <span class='category-tag' data-cat='"
    + alias2(alias1((depth0 != null ? depth0.slug : depth0), depth0))
    + "'>\n                "
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\n                <span class='category-count'>\n                    "
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + "\n                </span>\n            </span>\n        </li>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.children : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <li>\n             <span class='category-tag' data-cat='"
    + alias2(alias1((depth0 != null ? depth0.slug : depth0), depth0))
    + "'>\n                "
    + alias2(alias1((depths[1] != null ? depths[1].name : depths[1]), depth0))
    + "/"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\n                <span class='category-count'>\n                    "
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + "\n                </span>\n            </span>\n        </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<ul class='category-tags'>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.categories : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true,"useDepths":true});

this["JST"]["js/templates/mustache/front.mustache"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class='content front'>\n    \n</div>\n\n";
},"useData":true});

this["JST"]["js/templates/mustache/home.mustache"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class='content page' data-url=\""
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"url","hash":{},"data":data}) : helper)))
    + "\" style='display:none;'>\n    <div class='page-thumbnails content-thumbnail'>\n        <div class='grid-sizer'></div>\n        <div class='gutter-sizer'></div>\n    </div>\n</div>\n\n";
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
    var helper;

  return "        <div class=\"thumbnail-image\">\n            <img class='activator' src='"
    + container.escapeExpression(((helper = (helper = helpers.img_url || (depth0 != null ? depth0.img_url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"img_url","hash":{},"data":data}) : helper)))
    + "'>\n        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\"thumbnail-card thumbnail-small "
    + alias4(((helper = (helper = helpers.category_string || (depth0 != null ? depth0.category_string : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category_string","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.img_url : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"thumbnail-content\">\n        <span class=\"thumbnail-title activate\"> "
    + ((stack1 = alias5(((stack1 = (depth0 != null ? depth0.title : depth0)) != null ? stack1.rendered : stack1), depth0)) != null ? stack1 : "")
    + " </span>\n    </div>\n    <div    class=\"thumbnail-action\">\n        <a  href=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\" class='post-link'>view</a>\n    </div>\n    <div class=\"thumbnail-reveal\">\n        "
    + ((stack1 = alias5(((stack1 = (depth0 != null ? depth0.excerpt : depth0)) != null ? stack1.rendered : stack1), depth0)) != null ? stack1 : "")
    + "\n    </div>\n</div>\n\n";
},"useData":true});

this["JST"]["js/templates/mustache/post_thumbnail.mustache"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "1";
},"3":function(container,depth0,helpers,partials,data) {
    return "0";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <div class=\"thumbnail-image\">\n            <img src='"
    + container.escapeExpression(((helper = (helper = helpers.img_url || (depth0 != null ? depth0.img_url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"img_url","hash":{},"data":data}) : helper)))
    + "'>\n        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=container.lambda;

  return "<div class=\"thumbnail-card thumbnail-small\" data-sticky='"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.sticky : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "'>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.img_url : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"thumbnail-title\">\n        <span class=\"thumbnail-title activate\"> \n            "
    + ((stack1 = alias2(((stack1 = (depth0 != null ? depth0.title : depth0)) != null ? stack1.rendered : stack1), depth0)) != null ? stack1 : "")
    + " \n        </span>\n    </div>\n     <div class=\"thumbnail-excerpt\">\n        "
    + ((stack1 = alias2(((stack1 = (depth0 != null ? depth0.excerpt : depth0)) != null ? stack1.rendered : stack1), depth0)) != null ? stack1 : "")
    + "\n    </div>\n    <div class=\"thumbnail-content\">\n        "
    + ((stack1 = alias2(((stack1 = (depth0 != null ? depth0.content : depth0)) != null ? stack1.rendered : stack1), depth0)) != null ? stack1 : "")
    + "\n    </div>\n</div>\n\n";
},"useData":true});

if (typeof exports === 'object' && exports) {module.exports = this["JST"];}