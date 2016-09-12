.PHONY: build

output_dir=../tmp/staging

build: sass info.txt 
	cat info.txt > style.css && sass sass/style.scss >> style.css

move: build
	mkdir -p $(output_dir) && cp style.css $(output_dir)

all: move
	
