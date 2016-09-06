#! /bin/env python
import unittest
import SimpleHTTPServer
import SocketServer
import sys
from threading import Thread
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import socket;

PORT = 8000

class bakehardjs_test(unittest.TestCase):
    def setUp(self):
        self.driver=webdriver.PhantomJS()
 
    def tearDown(self):
        self.driver.close()

    def wait(self): 
        while not self.driver.execute_script('return window.G_testRunner.isFinished()'):
            time.sleep(.1)
    
    def report(self):
        print(self.driver.execute_script('return window.G_testRunner.getReport()'))
    
    def check_success(self):
        self.assertTrue(self.driver.execute_script('return window.G_testRunner.isSuccess()'))
    
    def test(self):
        self.driver.get("http://localhost:"+str(PORT)+"/test/bakehard_test.html")
        self.wait()
        self.report()
        self.check_success() 


if __name__ == '__main__':
    Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
    Handler.extensions_map.update({
        '.webapp': 'application/x-web-app-manifest+json',
    });
   
    while PORT<9000:
        try:
            httpd = SocketServer.TCPServer(("", PORT), Handler)        
        except Exception as e:
            PORT=PORT+1
        else:
            break
    else:
        sys.exit(1)

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
    
