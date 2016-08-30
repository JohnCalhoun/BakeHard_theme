.PHONY: dir
output_dir=../tmp/staging/js

cljs: cljs/*
	cd cljs && lein cljsbuild once

dir: 
	mkdir -p $(output_dir)

move-cljs: dir cljs
	cp -r cljs/js/* $(output_dir)

move-mat: dir materialize.min.js
	cp materialize.min.js $(output_dir)

all: move-cljs move-mat
	
