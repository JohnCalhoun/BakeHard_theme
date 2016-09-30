var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')

describe('load',function(){  

    beforeEach(function(){
        browser.url('/menus/test.html')           
        browser.waitForExist('#done')
    })

    it('render_insert',function(){
        var exist=browser.isExisting('#test') 
        expect(exist).to.equal(true)
    })
    it('get_ids',function(){
        var exmplar=[1636, 703, 701, 2, 1133, 1134, 501, 155, 156, 174, 173, 172, 746, 748, 742, 744, 146, 733, 735]  
        
        var ids=browser.execute(function(){
                return(window.ids)
            })
        for(var i=0;i<exmplar.length;i++){
            expect(ids.value[i]).to.equal(exmplar[i])
        }
    })

    after(function(){
        //console.log(browser.log('browser'))
    })
})
