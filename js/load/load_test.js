goog.require('goog.testing.ContinuationTestCase')
goog.require('goog.testing.jsunit')
goog.require('goog.events.EventTarget')

goog.require('bh.render.load')

if(typeof load_test_flag != 'undefined'){
var stubs;
var clear=function(){
    $(".content").empty();
    assertEquals("test should start out empty",0,$('#test').length)
}

var setUp=function(){
    stubs=new goog.testing.PropertyReplacer();
    stubs.replace(  bh.progress,
                    "start", 
                    function(){} 
                    )
    clear()
}

var tearDown=function(){
    stubs.reset();
    clear()
}

var testRender=function(){ 

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
        window,
        "page_rendered",
        function(){  
            assertNotEquals("data should be loaded and inserted",0,$(".content").children('#test-render').length)
            assertTrue("before event should be called",before_send_called)
            assertEquals("event should be success","success",result) 
        }
    );
    
    $(window).on("page_rendered",function(ev,arg1){
        result=arg1
        event_target.dispatchEvent('page_rendered')
    });
    $(window).on("page_rendering",function(){
        event_target.dispatchEvent('page_rendering')
        before_send_called=true;
    });
    bh.render.load.load("/src/load/test_data/page_1.html")   
}
var testRender_fail=function(){ 
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

    bh.render.load.load("/src/load/test_data/not_here.html")   
}

var testCase=new goog.testing.ContinuationTestCase();
testCase.autoDiscoverTests();
G_testRunner.initialize(testCase);

}
