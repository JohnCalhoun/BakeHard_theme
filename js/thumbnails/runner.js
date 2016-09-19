var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')

describe('load',function(){  

    before(function(){
        browser.url('/thumbnails/test.html') 
          
    })

    it('api_url',function(){
        browser.execute(
            function(){
                window.thumbnails_test.load_new()  
            }
        )
        var examplar='/thumbnails/data/posts?page=1&per_page=10' 
        var url=browser.execute(
            function(){
                return(window.thumbnails_test.api_url(1))
            }
        ).value
        expect(url)
            .to
            .equal(examplar)
    })

    it('load',function(){
        browser.execute(
            function(){
                window.thumbnails_test.load_new()  
            }
        )
        expect(browser.isExisting('.thumbnail-card'))
            .to
            .equal(true) 
    })
    it('filter',function(){
        browser.execute(
            function(){
                window.thumbnails_test.load_new()  
            }) 
        browser.execute(
            function(){
                window.thumbnails_test.add_filter('thumbnail')  
            })
        
        var filtered=browser.execute(
            function(){
                return(window.thumbnails_test.iso.getFilteredItemElements().length)
            }).value

        console.log(filtered)
        expect(filtered)
            .to
            .equal(0)
        
        browser.execute(
            function(){
                window.thumbnails_test.remove_filter('thumbnail')  
            })
        
        var filtered=browser.execute(
            function(){
                return(window.thumbnails_test.iso.getFilteredItemElements().length)
            }).value
        expect(filtered)
            .to
            .not
            .equal(0)
    })
    it('sort',function(){
        browser.execute(
            function(){
                window.thumbnails_test.load_new()  
            })
        browser.execute(
            function(){
                window.thumbnails_test.sort()})
        var order=browser.execute(
            function(){ 
                var els=window.thumbnails_test.iso.getFilteredItemElements() 
                var order=jQuery.map(els,function(b,c){return(jQuery(b).attr('data-sort'))})
                return(order)
            }).value
        
        var largest=0
        var sorted=true
        for(i=0;i<order.length; i++){
            if(order[i]>= largest){
                largest=order[i]
            }else{
                sorted=false
            }
        }
        expect(sorted)
            .to
            .equal(true)
    })  
    after(function(){
        //console.log(browser.log('browser'))
    })
})
