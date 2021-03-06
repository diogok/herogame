all: 
	mkdir -p target/assets
	mkdir -p target/js
	./minify.sh
	cat target/js/game.js > target/all.js
	cat target/js/buttons.js >> target/all.js
	cat target/js/messages.js >> target/all.js
	cat target/js/tile.js >> target/all.js
	cat target/js/tile.map.js >> target/all.js
	cat target/js/tile.char.js >> target/all.js
	cat target/js/tile.automove.js >> target/all.js
	cat target/js/quest.js >> target/all.js
	cat target/js/hero.js >> target/all.js
	cp index.min.html target/index.html
	cp assets/sprites-16x16.png target/assets -a
	cp README.html target/README.html
	zip target/hero.zip target/assets/sprites-16x16.png target/README.html target/index.html target/all.js

clean: 
	rm target -Rf
