goog.require('goog.testing.ContinuationTestCase')
goog.require('goog.testing.jsunit')
goog.require('goog.testing.PropertyReplacer')
goog.require('goog.uri.utils')
goog.require('bakehard.navigate')
goog.require('goog.events.EventTarget')

if(typeof navigate_test_flag != 'undefined'){
var setUp=function(){}

var tearDown=function(){}

var testnavigate=function(){
    var event_target=new goog.events.EventTarget() 
    goog.events.listenOnce( event_target,
                            "page_rendered",
                            function(){});
    
    waitForEvent(
        event_target,
        "page_rendered",
        function(){       
            assertEquals(   "hash should have been changed",
                            "/src/test/html/data.html",
                            goog.uri.utils.getFragment(window.location.href)
                        )
            assertNotEquals("data should be inserted",0,$("#test-render").length)
        }
    );
    
    $(document).on("page_rendered",function(ev,arg1){
        result=arg1
        event_target.dispatchEvent('page_rendered')
    });

    $('#link-1').click()
}

var testCase=new goog.testing.ContinuationTestCase();
testCase.autoDiscoverTests();
G_testRunner.initialize(testCase);

}
