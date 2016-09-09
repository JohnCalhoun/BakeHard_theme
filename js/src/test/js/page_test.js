goog.require('goog.testing.ContinuationTestCase')
goog.require('goog.testing.jsunit')
goog.require('bakehard.render.page')
goog.require('goog.events.EventTarget')

if(typeof page_test_flag != 'undefined'){
var clear=function(){
    $(".content").empty();
    assertEquals("test should start out empty",0,$('#test').length)
}

var setup=clear

var testInsert=function(){
    setup()
    
    var data="<div class='content_selector'><p id='test'>test<p></div>" 

    bakehard.render.page.extractInsert(data,".content_selector",".content")    
    assertNotEquals("data should be inserted",0,$(".content").children('#test').length)
    
    clear()
}

var testRender=function(){ 
    setup()

    var event_target=new goog.events.EventTarget() 
    goog.events.listenOnce( event_target,
                            "page_rendered",
                            function(){});
    goog.events.listenOnce( event_target,
                            "page_rendering",
                            function(){});
    
    var before_send_called=false; 
    var result={} 
    waitForEvent(
        event_target,
        "page_rendered",
        function(){  
            assertNotEquals("data should be loaded and inserted",0,$(".content").children('#test-render').length)
            assertTrue("before event should be called",before_send_called)
            assertEquals("event should be success","success",result) 
        }
    );
    
    $(document).on("page_rendered",function(ev,arg1){
        result=arg1
        event_target.dispatchEvent('page_rendered')
    });
    $(document).on("page_rendering",function(){
        event_target.dispatchEvent('page_rendering')
        before_send_called=true;
    });
    var ctx={"params":{
                "0":"/src/test/html/data.html",
                "source_id":"#content",
                "target_id":"#content"
                },
            "cache":{
                "pages":{} 
                }
            }
    bakehard.render.page.load(ctx)   
}
var testRender_fail=function(){ 
    setup()

    var event_target=new goog.events.EventTarget() 
    goog.events.listenOnce( event_target,
                            "page_rendered",
                            function(){});
    
    var result={} 
    waitForEvent(
        event_target,
        "page_rendered",
        function(){  
            assertEquals("event should be failed","fail",result) 
        }
    );
    
    $(document).on("page_rendered",function(ev,arg1){
        result=arg1
        event_target.dispatchEvent('page_rendered')
    });
    var ctx={"params":{
                "0":"not_here",
                "source_id":".content_selector",
                "target_id":".content"
                },
            "cache":{
                "pages":{} 
                }
            }

    bakehard.render.page.load(ctx)   
}

var testCase=new goog.testing.ContinuationTestCase();
testCase.autoDiscoverTests();
G_testRunner.initialize(testCase);

}
