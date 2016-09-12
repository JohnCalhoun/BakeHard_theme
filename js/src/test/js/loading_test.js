goog.require('goog.testing.ContinuationTestCase')
goog.require('goog.testing.jsunit')
goog.require('bakehard.loading')
goog.require('bakehard.templates')
goog.require('goog.events.EventTarget')

if(typeof loading_test_flag != 'undefined'){

var testloading=function(){ 
    bakehard.loading.start('#loading-screen','main',bakehard.templates.loading )()
    assertTrue('should add loading screen', jQuery('#loading-screen').length !=0 )
    assertTrue('screen should be visible', jQuery('main').children(':hidden').length == 0)

    bakehard.loading.stop('#loading-screen')()
    
    assertTrue('screen should be hidden', jQuery('main').children(':hidden').length != 0)
}

var testCase=new goog.testing.ContinuationTestCase();
testCase.autoDiscoverTests();
G_testRunner.initialize(testCase);

}
