.PHONY: clean upload style js assets php stage
.IGNORE: clean

clean:
	rm -r ./tmp/staging/*; rm -r ./tmp/bakehard/*; return 1

style: 
	cd ./style && make all 

js: 
	cd ./js && make all

assets: 
	cd ./assets && make all

php: 
	cd ./php && make all

stage: clean style js assets php
	echo 'staging'

package: stage
	cp -r ./tmp/staging/* ./tmp/bakehard && \
	cd ./tmp && \
	zip -r bakehard.zip ./bakehard	&& \
	mv bakehard.zip .. 

upload: stage
	rsync -r --port=18765 -e ssh ./tmp/staging johnmcal@johnmcalhoun.com:~/public_html/bakehard/wp-content/themes/bakehard
	
