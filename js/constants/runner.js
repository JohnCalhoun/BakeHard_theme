var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')


describe('constants',function(){  

    before(function(){
        browser.url('/constants/test.html') 
    })

    it('initialize',function(){

        //browser.waitForExist('#done')
        var constants=browser.execute(function(){
                return(window.constants_test )
            }).value
        expect(constants.base_url).to.equal('/constants/data/')
        expect(constants.api_url).to.equal('/constants/data/wp/v2/')
        expect(constants.bh_api_url).to.equal('/constants/data/bakehard/v1/')
        expect(constants.site_url).to.equal('http://johnmcalhoun.com/bakehard/') 
        expect(constants.sticky_posts.toString()).to.equal('1')  
    })
    
    after(function(){
        //console.log(browser.log('browser'))
    })
})
