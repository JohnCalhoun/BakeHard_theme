.PHONY: clean upload

clean:
	rm -r ./tmp/staging/*; rm -r ./tmp/bakehard/*

style: ./style/*
	cd ./style && make all 

js: ./js/*
	cd ./js && make all

assets: ./assets/*
	cd ./assets && make all

php: ./php/*
	cd ./php && make all

stage: style js assets php
	echo 'staging'

package: stage
	cp -r ./tmp/staging/* ./tmp/bakehard && zip -r bakehard.zip ./tmp/bakehard	

upload:
	scp -r -P 18765 ./tmp/staging/* johnmcal@johnmcalhoun.com:~/public_html/bakehard/wp-content/themes/mmn
	
