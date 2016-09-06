.PHONY: dir move-mat
output_dir=../tmp/staging/js

dir: 
	mkdir -p $(output_dir)

bakehard.js:./src/*.js
	java -jar ../bin/plovr.jar build src/build.js > bakehard.js

test:bakehard.js
	./run_test.py && rm *.log

move:dir bakehard.js
	cp bakehard.js $(output_dir) && cp src/materialize.min.js $(output_dir)


all: move
	
