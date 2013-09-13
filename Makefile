all: 
	mkdir -p target/assets
	mkdir -p target/js
	./minify.sh
	cat target/js/game.js > target/all.js
	cat target/js/buttons.js >> target/all.js
	cat target/js/messages.js >> target/all.js
	cat target/js/tile.js >> target/all.js
	cat target/js/tileMap.js >> target/all.js
	cat target/js/tileChar.js >> target/all.js
	cat target/js/graph.js >> target/all.js
	cat target/js/tileAutoMove.js >> target/all.js
	cat target/js/quest.js >> target/all.js
	cat target/js/hero.js >> target/all.js
	cp index.min.html target/index.html
	cp assets/sprites-16x16.png target/assets -a
	./Markdown.pl README.md > target/README.html
	zip target/hero.zip target/assets/sprites-16x16.png target/README.html target/index.html target/all.js

clean: 
	rm target -Rf
