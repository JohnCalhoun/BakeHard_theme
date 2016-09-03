.PHONY: dir move-mat
output_dir=../tmp/staging/js

dir: 
	mkdir -p $(output_dir)

bakehard.js:./src
	closure-compiler --js ./src/bakehard.src.js --js_output_file bakehard.js 

move:dir bakehard.js
	cp bakehard.js $(output_dir) && cp materialize.min.js $(output_dir)

all: move
	
