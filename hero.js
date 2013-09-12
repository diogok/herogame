
var HeroGame = (function(){
        var HeroGame = {
            id: "game",
            width: 860,
            height: 640,
            scale: 2,
            sprite: {
                file:"assets/sprites-16x16.png",
                size: 16 
            },
            quest: null,
            game: null
        };

        HeroGame.afterDrawChar = function(canvas,theChar,game) {
            var l = (theChar.life * 100) / theChar.maxLife;
            var w = (HeroGame.sprite.size * HeroGame.scale) * (l/100);
            canvas.beginPath();
            canvas.rect(theChar.x * HeroGame.game.scale + HeroGame.game.diffX,(theChar.y - 2) * HeroGame.game.scale + HeroGame.game.diffY,w,5);
            canvas.fillStyle = 'green';
            canvas.fill();
            canvas.lineWidth = 1 ;
            canvas.strokeStyle = 'black';
            canvas.stroke();
        };

        var hero =  {
            name:"hero",
            type:"hero",
            autoDraw: true,
            sprite: {
                y: 2,
                x: 0
            },
            life: 20,
            attack: 5,
            defense: 5,
            maxLife: 20,
            items: [],
            afterDraw: HeroGame.afterDrawChar,
            update: function(events,hero,game) {
                if(hero.life <= 0) {
                    HeroGame.gameOver();
                }
                if(hero.life > hero.maxLife) hero.life = hero.maxLife;
                if(events.click && events.click.tile) {
                    if(events.click.tile.type == 'floor') {
                        hero.moveTo = {x: events.click.x * HeroGame.sprite.size, y: events.click.y * HeroGame.sprite.size};
                    } else if(events.click.tile.type == 'door') {
                        if( HeroGame.game.near(hero, {x:events.click.x * HeroGame.sprite.size,y:events.click.y * HeroGame.sprite.size},HeroGame.sprite.size)) {
                            if(events.click.tile.locked){
                                var got = false;
                                for(var i in hero.items) {
                                    if(hero.items[i].name == events.click.tile.locked) {
                                        got =true;
                                    }
                                }
                                if(!got){ 
                                    HeroGame.game.message("This door is locked!");
                                } else {
                                    HeroGame.switchMap(events.click.tile.goTo);
                                }
                            } else {
                                HeroGame.switchMap(events.click.tile.goTo);
                            }
                       }
                   } else if(events.click.tile.type == "chest") {
                        if(!events.click.tile.open && HeroGame.game.near(hero, {x:events.click.x * HeroGame.sprite.size,y:events.click.y * HeroGame.sprite.size},HeroGame.sprite.size)) {
                            HeroGame.openChest(events.click.tile);
                        }
                   } else if(events.click.tile.type == 'potion') {
                       var deleted = false;
                       for(var i in hero.items) {
                           if(hero.items[i].name == events.click.tile.name) {
                               delete hero.items[i];
                               deleted = true;
                           } else  if(deleted) {
                               hero.items[i].y -= HeroGame.sprite.size;
                           }
                       }
                       hero.items = hero.items.filter(function(i) { return typeof i != 'undefined';});
                       hero.life += 5;
                       HeroGame.game.message("You recovered 5 life points.");
                       HeroGame.game.removeEntity(events.click.tile);
                   } else if(events.click.tile.type == "monster") {
                       if(HeroGame.game.near(hero,{x:events.click.x * HeroGame.sprite.size,y:events.click.y * HeroGame.sprite.size},HeroGame.sprite.size)) {
                           HeroGame.attack(hero,events.click.tile);
                       }
                   } else if(events.click.tile.type == "message") {
                       if(HeroGame.game.near(hero,{x:events.click.x * HeroGame.sprite.size,y:events.click.y * HeroGame.sprite.size},HeroGame.sprite.size)) {
                           HeroGame.game.message(events.click.tile.message);
                       }
                   } else if(events.click.tile.type == 'trap') {
                       if(HeroGame.game.near(hero,{x:events.click.x * HeroGame.sprite.size,y:events.click.y * HeroGame.sprite.size},HeroGame.sprite.size)) {
                           hero.life -= 1;
                           HeroGame.game.message("Ouch! Hero took damage.");
                       }
                   } else if(events.click.tile.type == 'fake-floor') {
                       if(HeroGame.game.near(hero,{x:events.click.x * HeroGame.sprite.size,y:events.click.y * HeroGame.sprite.size},HeroGame.sprite.size)) {
                           hero.x = events.click.tile.x;
                           hero.y = events.click.tile.y;
                       }
                   } else if(events.click.tile.type == 'save') {
                       if(HeroGame.game.near(hero,{x:events.click.x * HeroGame.sprite.size,y:events.click.y * HeroGame.sprite.size},HeroGame.sprite.size)) {
                           var save = {
                               hero: hero,
                               quest: HeroGame.quest,
                               map: {map: HeroGame.map.name ,x:hero.x / HeroGame.sprite.size ,y:hero.y / HeroGame.sprite.size}
                           };
                           window.localStorage.setItem('save',JSON.stringify(save));
                           HeroGame.game.message("Game saved!");
                       }
                   } else if(events.click.tile.type == 'exit') {
                        var got = false;
                        for(var i in hero.items) {
                            if(hero.items[i].name == events.click.tile.item) {
                                got=true;
                            }
                        }
                        if(!got) { 
                            HeroGame.game.message("Hey, go get that "+ events.click.tile.item +"!");
                        } else {
                            var end = HeroGame.quest.ending.reverse();
                            for(var i in end) {
                                HeroGame.game.message(end[i],10000);
                            }
                        }
                   }
                }
            }
        };

        HeroGame.dice = function() {
            return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        };

        HeroGame.gameOver = function() {
            setTimeout(function(){
                HeroGame.game.stop();
            },1000);
            setTimeout(function(){
                HeroGame.game.run(HeroGame);
            },3000);
            HeroGame.game.message("You lost, pal!");
        };

        HeroGame.attack = function(p1,p2) {
            var hit = p1.attack + HeroGame.dice() - p2.defense;
            if(hit <= 0) hit = 0;
            if(p1._last_attack) {
                if(p1._last_attack <= ((new Date().getTime()/1000) - 1)) {
                    p2.life -= hit;
                    p1._last_attack = (new Date().getTime())/1000;
                    HeroGame.game.message(p1.name+" delt "+hit+" damage to "+p2.name+".");
                    var e = {
                        "name":'-hit_'+new Date().getTime(),
                        "type":'fx',
                        "hit":hit,
                        "p2":p2,
                        "p1":p1,
                        "draw": function(canvas,hit,game){
                            var s  =  HeroGame.game.spriteSheet.size * HeroGame.game.scale;
                            var x0 = ( hit.p2.x * HeroGame.game.scale ) + HeroGame.game.diffX;
                            var y0 = ( hit.p2.y * HeroGame.game.scale ) + HeroGame.game.diffY;
                            if(hit.hit>0) canvas.strokeStyle = "red";
                            else canvas.strokeStyle = 'gray';
                            canvas.beginPath();
                            canvas.moveTo(x0 + 4,y0 + 4);
                            canvas.lineTo(x0 + s-4,y0+s-4);
                            canvas.moveTo(x0 + s -4,y0+4);
                            canvas.lineTo(x0+4,y0+s-4);
                            canvas.lineWidth = 1 * HeroGame.game.scale;
                            canvas.stroke();
                        }
                    };
                    HeroGame.game.addEntity(e);
                    setTimeout(function(){
                        HeroGame.game.removeEntity(e);
                    },500);
                } 
            } else {
                p1._last_attack = (new Date().getTime())/1000;
            }
        };

        HeroGame.monsterUpdate = function(events,monster,game) {
            if(monster.life <= 0) {
                delete monster.moveTo;
                monster.update = null;
                monster.afterDraw = null;
                monster.sprite = monster.dead;
                monster.type = 'floor';
                /*
                setTimeout(function(){
                    HeroGame.game.removeEntity(monster);
                },1000);
                */
            } else {
                if(HeroGame.game.near(hero,monster,HeroGame.sprite.size)) {
                    HeroGame.attack(monster,hero);
                }
                monster.moveTo = {x:hero.x,y:hero.y};
            }
        };

        HeroGame.openChest = function(chest) {
            chest.open = true;
            chest.sprite = chest.opened;
            var item = chest.item;
            item.autoDraw = true;
            item.x = HeroGame.sprite.size * -1;
            item.y = HeroGame.sprite.size * (hero.items.length + 1);
            hero.items.push(item);
            HeroGame.game.addEntity(item);
        };

        HeroGame.switchMap = function(to) {
            var map = HeroGame.quest.maps[to.map];
            HeroGame.map = map;
            HeroGame.game.reset();
            HeroGame.game.loadMap(map);
            HeroGame.game.addEntity(hero);
            for(var i in hero.items) {
                HeroGame.game.addEntity(hero.items[i]);
            }
            hero.x = to.x * HeroGame.sprite.size;
            hero.y = to.y * HeroGame.sprite.size;
            for(var i in map.entities) {
                if(map.entities[i].type == 'monster') {
                    map.entities[i].update = HeroGame.monsterUpdate;
                    map.entities[i].afterDraw = HeroGame.afterDrawChar;
                }
            }
        };

        HeroGame.addButton = function(msg,i,fun) {
            var button = {
                'name':'new-game',
                'draw':function(canvas,e,g) {
                    var w=400,h=50,x=canvas.width/2 - 200;
                    canvas.beginPath();
                    canvas.rect(x,50 * i ,w,h);
                    canvas.fillStyle = 'grey';
                    canvas.fill();
                    canvas.strokeStyle = 'black';
                    canvas.lineWidth = 3 ;
                    canvas.stroke();
                    canvas.fillStyle = "green";
                    canvas.font = "bold 24px sans-serif";
                    canvas.fillText(msg, x + 130, 50 * i + 35);
                },
                'update': function(events,e,g) {
                    if(events.click) {
                        var x = events.click.evt.layerX, y = events.click.evt.layerY;
                        if(   x > (g.canvas.width/2) - 200
                           && x < (g.canvas.width/2) - 200 + 400
                           && y > 50 * i
                           && y < 100 * i) {
                           if(fun()){
                            g.removeEntity(e);
                           }
                       }
                    }
                }
            };
            HeroGame.game.addEntity(button);
        };

        HeroGame.intro = function() {
            HeroGame.game.reset();
            hero.life = hero.maxLife;
            hero.items = [];

            HeroGame.addButton('New Game',1,function(){
                HeroGame.quest = JSON.parse(JSON.stringify( quest ) );
                HeroGame.switchMap(HeroGame.quest.start);
                var intro = HeroGame.quest.intro.reverse();
                for(var i in intro) {
                    HeroGame.game.message(intro[i],5000 * intro.length);
                }
                return true;
            });

            HeroGame.addButton('Load Game',2,function(){
                var save = window.localStorage.getItem('save');
                if(save) {
                    var save = JSON.parse(save);
                    hero.life = save.hero.life;
                    var c = 0;
                    for(var i in save.hero.items) {
                        var item = save.hero.items[i];
                        if(!item) continue;
                        item.autoDraw = true;
                        item.x = HeroGame.sprite.size * -1;
                        item.y = HeroGame.sprite.size * (c + 1);
                        hero.items.push(item);
                        c++;
                    }
                    HeroGame.quest = save.quest;
                    HeroGame.switchMap(save.map);
                    return true;
                } else {
                    HeroGame.game.message("Sorry, no saved game available.");
                    return false;
                }
            });

            setTimeout(function(){
                HeroGame.game.message('Click to move.');
                HeroGame.game.message('Click to interact.');
                HeroGame.game.message('Click to attack.');
                HeroGame.game.message('Click to survive.');
            },500);
        };

        HeroGame.run = function(game) {
            HeroGame.game = game;
            HeroGame.intro();
        };

        return HeroGame;
})();

