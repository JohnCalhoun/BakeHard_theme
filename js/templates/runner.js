var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')
var JST=require('./templates.js')
var fs=require('fs')

var compare=
    function(name,obj){
        return(
            function(){
                var exemplar=fs.readFileSync("./js/templates/data/"+name+".txt",'ascii')
                    .replace(/\s/g,"")          
                var output=JST['js/templates/mustache/'+name+'.mustache'](obj)
                    .replace(/\s/g,"")          
                expect(output).to.equal(exemplar)
            }
        )
    }


describe('templates',function(){  

    before(function(){})

    it('home',compare('home',{}))
    it('pages',compare('pages',{}))
    it('posts',compare('posts',{}))
    
    it('load',compare('load',{type:'type'}))
    it('thumbnail',compare('thumbnail',
        {
            category_string:'category_string',
            img_url:'img_url',
            title:{
                rendered:"title.rendered"
            },
            link:'link',
            excerpt:{
                rendered:"excerpt.rendered"
            } 
        }
    ))
    
    after(function(){
        //console.log(browser.log('browser'))
    })
})
