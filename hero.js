
var HeroGame = (function(){
        var HeroGame = {
            id: "game",
            width: 860,
            height: 640,
            scale: 2,
            sprite: {
                file:"sprites-16x16.png",
                size: 16 
            },
            game: null,
            entities: [ ]
        };

        HeroGame.afterDrawChar = function(canvas,achar,game) {
            var l = (achar.life * 100) / achar.maxLife;
            var w = (HeroGame.sprite.size * HeroGame.scale) * (l/100);
            canvas.beginPath();
            canvas.rect(achar.x * HeroGame.game.scale,(achar.y - 2) * HeroGame.game.scale,w,5);
            canvas.fillStyle = 'green';
            canvas.fill();
            canvas.strokeStyle = 'black';
            canvas.stroke();
        };

        var hero =  {
            name:'hero',
            type:"hero",
            x: maps.first.start[1] * HeroGame.sprite.size,
            y: maps.first.start[0] * HeroGame.sprite.size,
            autoDraw: true,
            items: [],
            sprite: {
                row: 4,
                col: 0
            },
            life: 10,
            attack: 5,
            defense: 5,
            maxLife: 10,
            afterDraw: HeroGame.afterDrawChar,
            update: function(events,hero,game) {
                if(hero.life <= 0) {
                    HeroGame.gameOver();
                }
                if(events.click && events.click.tile) {
                    if(events.click.tile.type == 'floor') {
                        hero.moveTo = {x: events.click.x * HeroGame.sprite.size, y: events.click.y * HeroGame.sprite.size};
                    } else if(events.click.tile.type == 'door') {
                        if( HeroGame.game.near(hero, {x:events.click.x * HeroGame.sprite.size,y:events.click.y * HeroGame.sprite.size},HeroGame.sprite.size)) {
                            HeroGame.switchMap(events.click.tile.goTo);
                       }
                   } else if(events.click.tile.type == "chest") {
                        if(!events.click.tile.open && HeroGame.game.near(hero, {x:events.click.x * HeroGame.sprite.size,y:events.click.y * HeroGame.sprite.size},HeroGame.sprite.size)) {
                            HeroGame.openChest(events.click.tile);
                        }
                   } else if(events.click.tile.type == "monster") {
                       if(HeroGame.game.near(hero,{x:events.click.x * HeroGame.sprite.size,y:events.click.y * HeroGame.sprite.size},HeroGame.sprite.size)) {
                           HeroGame.attack(hero,events.click.tile);
                       }
                   }
                }
            }
        };

        HeroGame.dice = function() {
            return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        };

        HeroGame.entities.push(hero);

        HeroGame.gameOver = function() {
            HeroGame.game.stop();
        };

        HeroGame.attack = function(p1,p2) {
            var hit = p1.attack + HeroGame.dice() - p2.defense;
            if(hit <= 0) hit = 0;
            if(p1._last_attack) {
                if(p1._last_attack <= ((new Date().getTime()/1000) - 1)) {
                    p2.life -= hit;
                    p1._last_attack = (new Date().getTime())/1000;
                } 
            } else {
                p1._last_attack = (new Date().getTime())/1000;
            }
        };

        HeroGame.monsterUpdate = function(events,monster,game) {
            if(monster.life <= 0) {
                game.removeEntity(monster);
            }else if(HeroGame.game.near(hero,monster,HeroGame.sprite.size)) {
                HeroGame.attack(monster,hero);
            } else {
                monster.moveTo = {};
                if(hero.x > monster.x) {
                    monster.moveTo.x = hero.x - HeroGame.sprite.size;
                } else {
                    monster.moveTo.x = hero.x + HeroGame.sprite.size;
                }
                if(hero.y > monster.y) {
                    monster.moveTo.y = hero.y - HeroGame.sprite.size;
                } else {
                    monster.moveTo.y = hero.y + HeroGame.sprite.size;
                }

            }
        };

        HeroGame.openChest = function(chest) {
            chest.open = true;
            chest.sprite = chest.opened;
            var item = chest.item;
            item.autoDraw = true;
            item.x = (HeroGame.width / 2) - HeroGame.sprite.size ;
            item.y = HeroGame.sprite.size - (hero.items.length * HeroGame.sprite.size);
            hero.items.push(item);
            HeroGame.game.addEntity(item);
        };

        HeroGame.switchMap = function(to) {
            var map = maps[to[0]];
            HeroGame.map = map;
            HeroGame.game.reset();
            HeroGame.game.loadMap(map);
            HeroGame.game.addEntity(hero);
            for(var i in hero.items) {
                HeroGame.game.addEntity(hero.items[i]);
            }
            hero.x = to[2] * HeroGame.sprite.size;
            hero.y = to[1] * HeroGame.sprite.size;
            for(var i in map.entities) {
                if(map.entities[i].type == 'monster') {
                    map.entities[i].update = HeroGame.monsterUpdate;
                    map.entities[i].afterDraw = HeroGame.afterDrawChar;
                }
            }
        };

        HeroGame.run = function(game) {
            HeroGame.game = game;
            HeroGame.switchMap(["gomonster",maps.gomonster.start[0],maps.gomonster.start[1]]);
        };

        return HeroGame;
})();

window.onload = function() {
    Game.run(HeroGame);
};

