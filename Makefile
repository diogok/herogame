all: clean
	mkdir -p target/assets
	./compile.sh game.js > target/game.min.js
	./compile.sh quest.js > target/quest.min.js
	./compile.sh graph.js > target/graph.min.js
	./compile.sh hero.js > target/hero.min.js
	sed -e 's/\.js/.min.js/g' index.html > target/index.html
	cp assets/sprites-16x16.png target/assets -a
	zip target/hero.zip target/* -r

clean: 
	rm target -Rf
