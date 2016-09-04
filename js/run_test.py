#! /bin/env python
import unittest
import SimpleHTTPServer
import SocketServer
from threading import Thread
from selenium import webdriver

PORT = 8000 

class bakehardjs_test(unittest.TestCase):
    def setUp(self):
        self.driver=webdriver.PhantomJS()
    
    def test_empty(self):
        self.driver.get("localhost:8000/test/bakehard_test.html") 

    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
    Handler.extensions_map.update({
        '.webapp': 'application/x-web-app-manifest+json',
    });
    
    httpd = SocketServer.TCPServer(("", PORT), Handler)        
    
    def run_server():
        httpd.serve_forever()
    thread=Thread(target=run_server) 
    thread.daemon=True 
    thread.start() 
    
    try:
        unittest.main()
    finally:
        httpd.shutdown()
        thread.join()
    
