var glob = ('undefined' === typeof window) ? global : window,

Handlebars = glob.Handlebars || require('handlebars');

this["JST"] = this["JST"] || {};

this["JST"]["js/templates/mustache/cat_tag.mustache"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <li><span class='category-tag' data-cat='"
    + alias2(alias1((depth0 != null ? depth0.slug : depth0), depth0))
    + "'>\n            "
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\n            <span class='category-count'>\n                "
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + "\n            </span>\n        </span></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class='category-tags'>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.categories : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true});

this["JST"]["js/templates/mustache/home.mustache"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div></div>\n\n";
},"useData":true});

this["JST"]["js/templates/mustache/load.mustache"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"content loading-"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + " loading\" id=\"loading-"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\">\n     <div class=\"progress\">\n        <div class=\"indeterminate\"></div> \n    </div> \n</div>\n\n";
},"useData":true});

this["JST"]["js/templates/mustache/pages.mustache"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div></div>\n\n";
},"useData":true});

this["JST"]["js/templates/mustache/posts.mustache"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div></div>\n\n";
},"useData":true});

this["JST"]["js/templates/mustache/thumbnail.mustache"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <div class=\"thumbnail-image\">\n            <img class='activator' src='"
    + container.escapeExpression(((helper = (helper = helpers.img_url || (depth0 != null ? depth0.img_url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"img_url","hash":{},"data":data}) : helper)))
    + "'>\n        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\"thumbnail-card thumbnail-card-small stick-action hoverable "
    + alias4(((helper = (helper = helpers.category_string || (depth0 != null ? depth0.category_string : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category_string","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.img_url : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"thumbnail-content\">\n        <span class=\"thumbnail-title activate\"> "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.title : depth0)) != null ? stack1.rendered : stack1), depth0))
    + " </span>\n    </div>\n    <div    class=\"thumbnail-action\">\n        <a  href=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\" class='post-link'>view</a>\n    </div>\n    <div class=\"thumbnail-reveal\">\n        "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.excerpt : depth0)) != null ? stack1.rendered : stack1), depth0))
    + "\n    </div>\n</div>\n\n";
},"useData":true});

if (typeof exports === 'object' && exports) {module.exports = this["JST"];}