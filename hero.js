
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
            update: function(events,hero,game) {
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

        HeroGame.entities.push(hero);

        HeroGame.attack = function(p1,p2) {
        };

        HeroGame.monsterUpdate = function(events,monster,game) {
            if(HeroGame.game.near(hero,monster,HeroGame.sprite.size)) {
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
            item.x = ( HeroGame.width / 2 ) - HeroGame.sprite.size ;
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
                }
            }
        };

        HeroGame.run = function(game) {
            HeroGame.game = game;
            HeroGame.map = maps.first;
            game.loadMap(maps.first);
        };

        return HeroGame;
})();

window.onload = function() {
    Game.run(HeroGame);
};

