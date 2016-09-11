goog.require('goog.testing.ContinuationTestCase')
goog.require('goog.testing.jsunit')
goog.require('goog.testing.PropertyReplacer')
goog.require('bakehard.render.thumbnail')
goog.require('goog.events.EventTarget')

if(typeof thumbnail_test_flag != 'undefined'){
var stubs;

var setUp=function(){
    stubs=new goog.testing.PropertyReplacer();
    stubs.replace(  bakehard.render.thumbnail,
                    "api_url", 
                    "/src/test/json/post.json"
                    )
}

var tearDown=function(){
    stubs.reset();
}
var testLoad=function(){


    var event_target=new goog.events.EventTarget();
    goog.events.listenOnce( event_target,
                            "check",
                            function(){})
    var triggered=false; 
    waitForEvent(
        event_target,
        "check",
        function(){           
            assertNotEquals("data should be inserted",0,$('.card').length)
        }
    );
    $(document).on("thumbnail_rendered",function(){
        triggered=true;
        event_target.dispatchEvent('check')
    });
    var ctx={"params":{
                    "path":"/src/test/json/post.json",
                    "page":"1"
                },
                    "cache":{
                        "pages":{},
                        "post_pages":{},
                        "posts":{}
                }
    }

    bakehard.render.thumbnail.load(ctx)
}

var testCase=new goog.testing.ContinuationTestCase();
testCase.autoDiscoverTests();
G_testRunner.initialize(testCase);

}
