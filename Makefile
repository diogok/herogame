all: clean
	mkdir -p target/assets
	java -jar yuicompressor-2.4.7.jar game.js > target/game.min.js
	java -jar yuicompressor-2.4.7.jar quest.js > target/quest.min.js
	java -jar yuicompressor-2.4.7.jar graph.js > target/graph.min.js
	java -jar yuicompressor-2.4.7.jar hero.js > target/hero.min.js
	sed -e 's/\.js/.min.js/g' index.html > target/index.html
	cp assets/sprites-16x16.png target/assets -a
	zip target/hero.zip target/* -r

clean: 
	rm target -Rf
