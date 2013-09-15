
(function(game){

    game.utils.saveGame = function(hero){
       var x = (hero.x / game.sprites.size);
       var y = (hero.y / game.sprites.size);
       var save = {
           hero: hero,
           quest: game.config.quest,
           map: {map: game.config.map.name,x:x,y:y }
       };
       window.localStorage.setItem('save',JSON.stringify(save));
       game.utils.showMessage("Game saved.");
   };

   game.utils.loadGame = function(){
       
   };

    var lifeBar = function(canvas,theChar,game) {
        if(theChar.life <=0) return;
        var l = (theChar.life * 100) / theChar.maxLife;
        var w = (game.sprites.size * game.config.scale) * (l/100);
        canvas.beginPath();
        canvas.rect(theChar.x * game.config.scale + game.config.diffX , (theChar.y - 2) * game.config.scale + game.config.diffY,w,5);
        canvas.fillStyle = 'green';
        canvas.fill();
        canvas.lineWidth = 1 ;
        canvas.strokeStyle = 'black';
        canvas.stroke();
    };

    var dice = function() {
        return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    };

    var gotItem = function(hero,item) {
        var got = false;
        for(var i in hero.items) {
            if(hero.items[i].name == item) {
                got=true;
            }
        }
        return got;
    };

    var attack = function(p1,p2) {
        if(p2.life <= 0) return;
        var hit = p1.attack + dice() - p2.defense;
        if(hit <= 0) hit = 0;
        if(p1._last_attack) {
            if(p1._last_attack <= ((new Date().getTime()/1000) - 1)) {
                p2.life -= hit;
                p1._last_attack = (new Date().getTime())/1000;
                game.utils.showMessage(p1.name+" delt "+hit+" damage to "+p2.name+".");
                var e = {
                    "name":'-hit-'+new Date().getTime(),
                    "type":'fx',
                    "hit":hit,
                    "p2":p2,
                    "p1":p1,
                    "draw": function(canvas,hit,game){
                        var s  =  game.sprites.size * game.config.scale;
                        var x0 = ( hit.p2.x * game.config.scale ) + game.config.diffX;
                        var y0 = ( hit.p2.y * game.config.scale ) + game.config.diffY;
                        if(hit.hit>0) canvas.strokeStyle = "red";
                        else canvas.strokeStyle = 'gray';
                        canvas.beginPath();
                        canvas.moveTo(x0 + 4,y0 + 4);
                        canvas.lineTo(x0 + s-4,y0+s-4);
                        canvas.moveTo(x0 + s -4,y0+4);
                        canvas.lineTo(x0+4,y0+s-4);
                        canvas.lineWidth = 1 * game.config.scale;
                        canvas.stroke();
                    }
                };
                game.addEntity(e);
                setTimeout(function(){
                    game.removeEntity(e);
                },500);
            } 
        } else {
            p1._last_attack = (new Date().getTime())/1000;
        }
    };

    var heroUpdate = function(events,hero,game) {
        if(hero.life <=0 ) return game.gameOver();
        if(hero.life > hero.maxLife) hero.life = hero.maxLife;
        if(events.keydown) {
            to = {x:hero.x,y:hero.y};
            if(events.keydown[39] || events.keydown[68]) { // right
                to.x += game.sprites.size;
            } else if(events.keydown[37] || events.keydown[65]) { // left
                to.x -= game.sprites.size;
            } else if(events.keydown[38] || events.keydown[87]) { // up
                to.y -= game.sprites.size;
            } else if(events.keydown[40] || events.keydown[83]) { //down
                to.y += game.sprites.size;
            }
            hero.moveTo = to;
        }
        if(events.click && events.click.tile) {
            var size = game.sprites.size;
            var tile = events.click.tile;
            if(tile.walkable) {
                hero.moveTo = {x: events.click.x * size, y: events.click.y * size};
            }

            if(tile.type == 'door') {
                if(game.utils.nearTile(hero,tile)) {
                    if(tile.locked && gotItem(hero,tile.locked)) {
                        game.utils.switchMap(tile.goTo);
                    } else if(tile.locked){
                        game.utils.showMessage("This door is locked!");
                    } else {
                        game.utils.switchMap(tile.goTo);
                    }
                }
            }

            if(tile.type == 'chest') {
                if(game.utils.nearTile(hero,tile) && !tile.open) {
                    tile.open = true;
                    tile.sprite = tile.opened;
                    tile.item.autoDraw = true;
                    tile.item.x = game.sprites.size * -1;
                    tile.item.y = game.sprites.size * (hero.items.length + 1);
                    hero.items.push(tile.item);
                    game.addEntity(tile.item);
                }
            }

            if(tile.type == 'potion') {
               var deleted = false;
               for(var i in hero.items) {
                   if(hero.items[i].name == tile.name) {
                       delete hero.items[i];
                       deleted = true;
                   }else if(deleted) {
                       hero.items[i].y -= game.sprites.size;
                   }
               }
               hero.items = hero.items.filter(function(i) { return typeof i != 'undefined';});
               hero.life += 6;
               game.utils.showMessage("You recovered 6 life points.");
               game.removeEntity(tile);
            }

            if(game.utils.nearTile(hero,tile)) {
                if(tile.type == 'monster') {
                    attack(hero,tile);
                }

                if(tile.message) {
                    game.utils.showMessage(tile.message);
                }

                if(tile.type == 'trap' || tile.trap) {
                   hero.life -= 1;
                   game.utils.showMessage("Ouch! Hero took damage.");
                }

                if(tile.type == 'fake-floor' || tile.fake_floor) {
                   hero.x = events.click.tile.x;
                   hero.y = events.click.tile.y;
                }

                if(tile.type == 'save' || tile.save) {
                    game.utils.saveGame(hero);
                }

                if(tile.type == 'exit' || tile.exit) {
                    if(gotItem(hero,tile.item)) {
                        game.winGame();
                    } else {
                        game.utils.showMessage("Hey, go get that "+ tile.item+"!");

                    }
                }
            }
        }
    };

    var monsterUpdate = function(events,monster,game) {
        if(monster.life <= 0) {
            delete monster.moveTo;
            monster.update = null;
            monster.afterDraw = null;
            monster.sprite = monster.dead;
            monster.type = 'floor';
            monster.walkable= true;
        } else {
            var hero = game.getEntity('hero');
            if(game.utils.nearTile(hero,monster)) {
                attack(monster,hero);
            }
            monster.moveTo = {x:hero.x,y:hero.y};
        }
    };

    game.beforeAddEntity.push(function(entity){
        if(entity.type == 'monster') {
            entity.beforeUpdate.push(monsterUpdate);
            entity.isChar = true;
        }
        if(entity.type == 'hero') {
            entity.beforeUpdate.push(heroUpdate);
            entity.isChar = true;
            var c = 0
            for(var i in entity.items) {
                c++
                var item = entity.items[i];
                item.autoDraw = true;
                item.x = game.sprites.size * -1;
                item.y = game.sprites.size * c;
                game.addEntity(item);
            }
        }
        if(entity.isChar && entity.life > 0) {
            entity.afterDraw.push(lifeBar);
        }
    });

})(Game);

