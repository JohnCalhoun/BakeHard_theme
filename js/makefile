.PHONY: dir move-mat
output_dir=../tmp/staging/js

dir: 
	mkdir -p $(output_dir)

bakehard.js:./src/bakehard.src.js  ./src/build.js
	java -jar ../bin/plovr.jar build src/build.js > bakehard.js

./test/bakehard_test.js:./test/bakehard_test.src.js ./src/bakehard.src.js ./build_test.js
	java -jar ../bin/plovr.jar build build_test.js > test/bakehard_test.js

test:./test/bakehard_test.js ./test/bakehard_test.html ./run_test.py 
	./run_test.py && rm *.log

move:dir bakehard.js
	cp bakehard.js $(output_dir) && cp src/materialize.min.js $(output_dir)


all: move
	
