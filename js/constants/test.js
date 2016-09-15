var constants=require('./constants.js')

var chai=require('chai')
var mocha=require('mocha')
var express=require('express')
var webdriver=require('selenium-webdriver')



describe('constants',function(){
    var server
    var driver
    before(function(){
            server=express().use(express.static(__dirname)).listen(8000);
            driver=new webdriver.Builder().forBrowser('phantomjs').build()
            console.log('1') 
    })

    it('get',function(){        
        driver.get('localhost:8000/constants_test.html')
    })

    after(function(){
        server.close()
        driver.quit()
    })

})
