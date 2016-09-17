(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
goog.require('goog.testing.ContinuationTestCase')
goog.require('goog.testing.jsunit')
goog.require('goog.events.EventTarget')

goog.require('bh.progress')
goog.require('bh.templates.components')

if(typeof progress_test_flag != 'undefined'){

var testprogress=function(){ 
    bh.progress.start('#loading-screen','main',bh.templates.components.progress )()
    assertTrue('should add loading screen', jQuery('#loading-screen').length !=0 )
    assertTrue('screen should be visible', jQuery('main').children(':hidden').length == 0)

    bh.progress.stop('#loading-screen')()
    
    assertTrue('screen should be hidden', jQuery('main').children(':hidden').length != 0)
}

var testCase=new goog.testing.ContinuationTestCase();
testCase.autoDiscoverTests();
G_testRunner.initialize(testCase);

}

},{}]},{},[1]);
