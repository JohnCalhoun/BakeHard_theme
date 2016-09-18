var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')

describe('load',function(){  

    before(function(){
        browser.url('/progress/test.html') 
    })

    it('empty',function(){
        browser.execute(function(){
            return(window.progress_start())
        })
        
        expect(browser.isExisting('#progress'))
            .to
            .equal(true)
        
        browser.execute(function(){
            return(window.progress_stop())
        })
        expect(browser.isVisible('#progress'))
            .to
            .equal(false)    
    })
    
    after(function(){
        //console.log(browser.log('browser'))
    })
})
