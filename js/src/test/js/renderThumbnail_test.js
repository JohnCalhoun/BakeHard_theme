goog.require('goog.testing.ContinuationTestCase')
goog.require('goog.testing.jsunit')
goog.require('goog.testing.PropertyReplacer')
goog.require('bakehard.renderThumbnail')
goog.require('goog.events.EventTarget')

if(typeof renderThumbnail_test_flag != 'undefined'){
var stubs;

var setUp=function(){
    stubs=new goog.testing.PropertyReplacer();
}

var tearDown=function(){
    stubs.reset();
}
var testLoad=function(){
    stubs.set(
        bakehard.renderThumbnail,
        "list_posts_url",
        function(){
            return("/src/test/json/post.json"); 
        }
    )
     
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
    $(document).on("thumbnailLoaded",function(){
        triggered=true;
        event_target.dispatchEvent('check')
    });
  
    bakehard.renderThumbnail.load()
}

var testCase=new goog.testing.ContinuationTestCase();
testCase.autoDiscoverTests();
G_testRunner.initialize(testCase);

}
