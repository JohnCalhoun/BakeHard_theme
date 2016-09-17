var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')

describe('load',function(){  

    before(function(){
        browser.url('/nav/test.html') 
    })

    it('two pages',function(){
        browser.waitForExist('#ready') 
        browser.click('#link-1') 
        browser.waitForExist('#done')
        expect(browser.getText('main'))
            .to
            .equal('/nav/data/page.html')
    })
    
    after(function(){
        //console.log(browser.log('browser'))
    })
})
