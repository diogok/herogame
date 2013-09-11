all: clean
	java -jar yuicompressor-2.4.7.jar game.js > game.min.js
	java -jar yuicompressor-2.4.7.jar quest.js > quest.min.js
	java -jar yuicompressor-2.4.7.jar hero.js > hero.min.js
	zip hero.zip index.html game.min.js quest.min.js hero.min.js sprites-16x16.png

clean:
	rm hero.zip *.min.js -f
