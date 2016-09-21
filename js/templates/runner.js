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
/*
    it('home',compare('home',{}))
    it('front',compare('front',{}))
    it('blog',compare('home',{}))
    it('page_thumbnail',compare('page_thumbnail',{
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
    
    it('post_thumbnail',compare('post_thumbnail',{
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

    it('cat_tag',compare('cat_tag',{
        categories:[
            {
                count:1,
                name:"Name_1",
                slug:"name_1"
            },
            {
                count:2,
                name:"Name_2",
                slug:"name_2"
            }
        ]
    }))
    
    it('load',compare('load',{type:'type'}))
 */  
    after(function(){
        //console.log(browser.log('browser'))
    })
})
