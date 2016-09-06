goog.require('goog.testing.ContinuationTestCase')
goog.require('goog.testing.jsunit')
goog.require('bakehard.scrollLoad')
goog.require('goog.events.EventTarget')
goog.require('goog.events.EventTarget')

if(typeof scrollLoad_test_flag != 'undefined'){
var clear=function(){}
var setup=clear

var testBottom=function(){
    $(window).scrollTop(0);

    var event_target=new goog.events.EventTarget();
    goog.events.listenOnce( event_target,
                            "check",
                            function(){})
    var triggered=false; 
    waitForEvent(
        event_target,
        "check",
        function(){  
            assertTrue("bottom scroll should have been called",triggered)
        }
    );
    $(document).on("scrolled2Bottom",function(){
        triggered=true;
        event_target.dispatchEvent('check')
    });

    $(window).scrollTop($(document).height())
}

var testCase=new goog.testing.ContinuationTestCase();
testCase.autoDiscoverTests();
G_testRunner.initialize(testCase);

}

