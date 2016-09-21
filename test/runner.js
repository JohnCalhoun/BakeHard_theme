var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')

describe('load',function(){  

    beforeEach(function(){
        browser.url('http://johnmcalhoun.com/bakehard/') 
    })

    it('home-nav',function(){
        browser.click('#home-btn')  
    })
    it('blog-nav',function(){ 
        browser.click('#blog-btn')  
    })
    
    afterEach(function(){
        //console.log(browser.log('browser'))
    })
})
