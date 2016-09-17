var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')


describe('constants in browser',function(){  

    before(function(){
        browser.url('/constants/test.html') 
    })

    it('initialize',function(){
        browser.getSource()
    })
    
    it('something else')
    after(function(){})
})
