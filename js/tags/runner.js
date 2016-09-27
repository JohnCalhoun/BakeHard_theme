var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')

describe('load',function(){  

    beforeEach(function(){
        browser.url('/tags/test.html')           
    })

    it('api_url',function(){        
        var examplar='/tags/data/categories?hide_empty=true&per_page=100' 
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
