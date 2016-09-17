var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')

describe('load',function(){  

    before(function(){
        browser.url('/load/test.html') 
    })

    it('two pages',function(){
        browser.waitForExist('#done')
        
        expect(browser.isExisting('#page_1')).to.equal(true)
        expect(browser.isExisting('#page_2')).to.equal(true) 
    })
    
    after(function(){
        //console.log(browser.log('browser'))
    })
})
