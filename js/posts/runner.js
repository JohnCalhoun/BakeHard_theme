var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')

describe('load',function(){  

    before(function(){
        browser.url('/posts/test.html') 
    })

    it('api_url',function(){
        var examplar='/posts/data/posts?page=1&per_page=10' 
        var url=browser.execute(
            function(){
                return(window.posts_test.api_url(1))
            }
        ).value
        expect(url)
            .to
            .equal(examplar)
    })

    it('load',function(){
        browser.execute(
            function(){
                window.posts_test.load_new()  
            }
        )
        expect(browser.isExisting('.thumbnail-card'))
            .to
            .equal(true)
 
    })
    it('filter',function(){})
   

    after(function(){
        //console.log(browser.log('browser'))
    })
})
