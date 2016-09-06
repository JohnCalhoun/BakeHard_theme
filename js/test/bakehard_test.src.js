goog.require('goog.testing.ContinuationTestCase')
goog.require('goog.testing.jsunit')
goog.require('bakehard.view')
goog.require('goog.events.EventTarget')
goog.require('goog.events.EventTarget')

var clear=function(){
    $(bakehard.view.content_selector).empty();
    assertEquals("test should start out empty",0,$('#test').length)
}
var setup=clear

var testInsert=function(){
    setup()
    
    var data="<div class='content_selector'><p id='test'>test<p></div>".replace("content_selector",bakehard.view.content_class) 

    bakehard.view.extractInsert(data)    
    assertNotEquals("data should be inserted",0,$(".content").children('#test').length)
    
    clear()
}

var testRender=function(){ 
    setup()

    var event_target=new goog.events.EventTarget() 
    goog.events.listenOnce( event_target,
                            "page_rendered",
                            function(){});
    waitForEvent(
        event_target,
        "page_rendered",
        function(){  
            assertNotEquals("data should be loaded and inserted",0,$(".content").children('#test-render').length)
        }
    );
    $(document).on("page_rendered",function(){
        event_target.dispatchEvent('page_rendered')
    });
    bakehard.view.render("data.html")   
    
    clear()
}

var testCase=new goog.testing.ContinuationTestCase();
testCase.autoDiscoverTests();
G_testRunner.initialize(testCase);


