var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')

describe('load',function(){  

    before(function(){
        browser.url('/tags/test.html')           
    })

    it('api_url',function(){        
        var examplar='/tags/data/categories' 
        var url=browser.execute(
            function(){
                return(window.tags_test.api_url(1))
            }
        ).value
        expect(url)
            .to
            .equal(examplar)
    })

    it('load',function(){
        browser.execute(
            function(){
                window.tags_test.load()  
            }
        )
        expect(browser.isExisting('.tag'))
            .to
            .equal(true) 
    })
    after(function(){
        //console.log(browser.log('browser'))
    })
})
