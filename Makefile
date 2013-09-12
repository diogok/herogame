all: clean
	java -jar yuicompressor-2.4.7.jar game.js > game.min.js
	java -jar yuicompressor-2.4.7.jar quest.js > quest.min.js
	java -jar yuicompressor-2.4.7.jar graph.js > graph.min.js
	java -jar yuicompressor-2.4.7.jar hero.js > hero.min.js
	cp index.html index.html.bkp
	sed -e 's/\.js/.min.js/g' index.html.bkp > index.html
	zip hero.zip index.html game.min.js graph.min.js quest.min.js hero.min.js sprites-16x16.png
	mv index.html.bkp index.html

clean:
	rm hero.zip *.min.js -f
