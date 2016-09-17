var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')

describe('load',function(){  

    before(function(){
        browser.url('/progress/test.html') 
    })

    it('empty',function(){
    })
    
    after(function(){
        //console.log(browser.log('browser'))
    })
})
