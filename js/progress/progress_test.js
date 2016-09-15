goog.require('goog.testing.ContinuationTestCase')
goog.require('goog.testing.jsunit')
goog.require('goog.events.EventTarget')

goog.require('bh.progress')
goog.require('bh.templates.components')

if(typeof progress_test_flag != 'undefined'){

var testprogress=function(){ 
    bh.progress.start('#loading-screen','main',bh.templates.components.progress )()
    assertTrue('should add loading screen', jQuery('#loading-screen').length !=0 )
    assertTrue('screen should be visible', jQuery('main').children(':hidden').length == 0)

    bh.progress.stop('#loading-screen')()
    
    assertTrue('screen should be hidden', jQuery('main').children(':hidden').length != 0)
}

var testCase=new goog.testing.ContinuationTestCase();
testCase.autoDiscoverTests();
G_testRunner.initialize(testCase);

}
