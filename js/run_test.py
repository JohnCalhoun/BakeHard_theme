#! /bin/env python
import unittest
import SimpleHTTPServer
import SocketServer
from threading import Thread
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
PORT = 8000 

class bakehardjs_test(unittest.TestCase):
    def setUp(self):
        self.driver=webdriver.PhantomJS()
 
    def tearDown(self):
        self.driver.close()

    def wait(self): 
        while not self.driver.execute_script('return window.G_testRunner.isFinished()'):
            time.sleep(.1)
    def check_success(self):
        self.assertTrue(self.driver.execute_script('return window.G_testRunner.isSuccess()'))

    def test_empty(self):
        self.driver.get("http://localhost:8000/test/bakehard_test.html")
        self.wait()
        self.check_success() 



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
    
