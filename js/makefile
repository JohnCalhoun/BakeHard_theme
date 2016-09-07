.PHONY: dir move-mat
output_dir=../tmp/staging/js

dir: 
	mkdir -p $(output_dir)

bakehard.min.js:./src
	java -jar ../bin/plovr.jar build src/build.min.js > bakehard.min.js

bakehard.js:./src
	java -jar ../bin/plovr.jar build src/build.js > bakehard.js

test:bakehard.js
	./run_test.py && rm *.log

move:dir bakehard.min.js
	cp ./*.min.js $(output_dir)	

all: move
	
