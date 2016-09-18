var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')

describe('routes',function(){  

    before(function(){
        browser.url('/routes/test.html') 
    })

    it('navigation',function(){
        var base="http://localhost:8000/routes/test.html"

        expect(browser.getUrl()).to.equal(base) 

        browser.click('#link1') 
        expect(browser.getUrl()).to.equal(base+'#link1') 
        
        browser.click('#link2') 
        expect(browser.getUrl()).to.equal(base+'#link2') 
        
        browser.back()
        expect(browser.getUrl()).to.equal(base+'#link1') 
    })
    
    after(function(){
        //console.log(browser.log('browser'))
    })
})
