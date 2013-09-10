
Game = (function(){
        var game = {
            canvas: null,
            canvasEl: null,
            updateInterval: null,
            drawRequest: null,
            updating: false,
            drawing: false,
            active: false,
            events: {},
            entities: [],
            spriteSheet: null,
            ready: false,
            scale: 1,
            config: null,
            map: null
        };

        game.near = function(a,b,t) {
           return a.x >= (b.x - t) &&
                  a.x <= (b.x + t) &&
                  a.y >= (b.y - t) &&
                  a.y <= (b.y + t) ;
        };

        game.reset = function() {
            game.entities = [];
            game.map = null;
        };

        game.loadMap = function(map) {
            game.map = map;
            var bkp = game.entities.slice();
            game.entities = [];
            for(var row=0; row<map.tiles.length;row++) {
                for(var col=0; col<map.tiles[row].length;col++) {
                    var tile = map.tiles[row][col];
                    var tileCfg = {
                        name: "-map-r:"+row+"-c:"+col,
                        x: col * map.sprite.size,
                        y: row * map.sprite.size,
                        autoDraw: true,
                        sprite: {
                            row: tile[0],
                            col: tile[1]
                        }
                    };
                    var tileCfgExtra = null, tileCfgExtraExtra = null;
                    try {
                        tileCfgExtra = game.map.sprite.config[tile[0]][tile[1]];
                        if(typeof tileCfgExtra == 'string') tileCfgExtra = {type:tileCfgExtra};
                        try {
                            tileCfgExtraExtra = game.map.config[row][col];
                        }catch(e){}
                    } catch(e) {}
                    if(tileCfgExtra != null) {
                        for(var k in tileCfgExtra) {
                            tileCfg[k] = tileCfgExtra[k];
                        }
                    }
                    if(tileCfgExtraExtra != null) {
                        for(var k in tileCfgExtraExtra) {
                            tileCfg[k] = tileCfgExtraExtra[k];
                        }
                    }
                    game.addEntity(tileCfg);
                }
            }
            if(map.entities) {
                for(var row=0; row<map.entities.length;row++) {
                    game.addEntity(map.entities[row]);
                }
            }
            for(var i=0;i<bkp.length;i++) {
                if(!bkp[i].name.match(/^-map-/)) {
                    game.entities.push(bkp[i]);
                }
            }
        };

        game.addEntity = function(entity) {
            if(entity.autoDraw) {
                entity.draw = function(canvas,entity,game) {
                    var sprite = game.spriteSheet;
                    canvas.drawImage(
                        sprite,
                        entity.sprite.col * sprite.size,
                        entity.sprite.row * sprite.size,
                        sprite.size,
                        sprite.size,
                        entity.x * game.scale,
                        entity.y * game.scale,
                        sprite.size * game.scale,
                        sprite.size * game.scale
                    );
                };
            }
            game.entities.push(entity);
        };

        game.removeEntity = function(entity) {
            var max = game.entities.length;
            for(var i =0;i<max;i++) {
                if(game.entities[i].name == entity.name) {
                    delete game.entities[i];
                }
            }
        };

        game.loadSprite = function(file,size) {
            var image = new Image();
            image.size = size;
            image.onload =  function() {
                game.spriteSheet = image;
            };
            image.src = file;
            game.spriteCount++;
        };

        game.draw = function() {
            if(game.drawing || !game.active || !game.ready) {
                game.drawRequest = requestAnimationFrame(function(){
                    game.draw()
                });
                return;
            }
            game.drawing = true;
            game.canvas.clearRect(0,0,game.canvas.wight,game.canvas.height);
            var entities = game.entities.slice();
            for(var i=0;i<entities.length;i++) {
                if(entities[i].beforeDraw) {
                    entities[i].beforeDraw(game.canvas,entities[i],game);
                }
                if(entities[i].draw) {
                    entities[i].draw(game.canvas,entities[i],game);
                }
                if(entities[i].afterDraw) {
                    entities[i].afterDraw(game.canvas,entities[i],game);
                }
            }
            game.drawing = false;
            game.drawRequest = requestAnimationFrame(function(){
                game.draw()
            });
        };

        game.move = function(entity) {
            if(!entity._to) {
                entity._to = 'x';
            }
            if(entity._to == 'x' && entity.x != entity.moveTo.x) {
                if(entity.x > entity.moveTo.x) {
                    entity.x -= 2;
                } else {
                    entity.x += 2;
                }
                if(entity.x % game.spriteSheet.size == 0) {
                    entity._to = 'y';
                }
                return;
            } else {
                entity._to = 'y';
            }
            if(entity._to == 'y' && entity.y != entity.moveTo.y) {
                if(entity.y > entity.moveTo.y) {
                    entity.y -= 2;
                } else {
                    entity.y += 2;
                }
                if(entity.y % game.spriteSheet.size == 0) {
                    entity._to = 'x';
                }
                return;
            } else {
                entity._to = 'x';
            }
            if(entity.y == entity.moveTo.y && entity.x == entity.moveTo.x) {
                delete entity.moveTo;
            }
        }

        game.update = function() {
            if(!game.ready) game.ready = (game.spriteSheet != null);
            if(game.updating || !game.active || !game.ready) return;
            game.updating = true;
            var entities = game.entities.slice();
            for(var i=0;i<entities.length;i++) {
                if(entities[i].moveTo) {
                    game.move(entities[i]);
                }
                if(entities[i].beforeUpdate) {
                    entities[i].beforeUpdate(game.events,entities[i],game);
                }
                if(entities[i].update){
                    entities[i].update(game.events,entities[i],game);
                }
                if(entities[i].afterUpdate) {
                    entities[i].afterUpdate(game.events,entities[i],game);
                }
            }
            game.events = {};
            game.updating = false;
        };

        game.stop = function() {
            if(!game.active) return;
            game.active = false;
            if(game.updateInterval) {
                clearInterval(game.updateInterval);
            }
            if(game.drawRequest) {
                cancelAnimationFrame(game.drawRequest);
            }
        };

        game.bindEvents = function() {
            game.canvasEl.addEventListener('click',function(evt) {
                var y = Math.floor(evt.layerY / ( game.spriteSheet.size * game.scale ));
                var x = Math.floor(evt.layerX / ( game.spriteSheet.size * game.scale ));
                try {
                    var entities = game.entities.slice();
                    var tileCfg = null;
                    for(var i =0;i<entities.length;i++) {
                        var eX = Math.floor( entities[i].x / game.spriteSheet.size );
                        var eY = Math.floor( entities[i].y / game.spriteSheet.size );
                        if(eX == x && eY == y) {
                            tileCfg = entities[i];
                        }
                    }
                    if(tileCfg != null) {
                        game.events.click = {y:y,x:x,tile:tileCfg,evt:evt};
                    } else {
                        game.events.click = {y:y,x:x,evt:evt};
                    }
                } catch(e) {
                    game.events.click = {y:y,x:x,evt:evt};
                }
            },false);
            window.addEventListener('keydown',function(evt) {
                if(!game.events.keydown) game.events.keydown = {};
                game.events.keydown[evt.keyCode];
            });
            window.addEventListener('keypress',function(evt) {
                if(!game.events.keypress) game.events.keypress = {};
                game.events.keypress[evt.charCode];
            });
            window.addEventListener('keyup',function(evt) {
                if(!game.events.keyup) game.events.keyup = {};
                game.events.keyup[evt.keyCode];
            });
        };

        game.run = function(config) {
            if(game.active) return;
            game.active = true;
            game.canvasEl = document.getElementById(config.id);
            game.canvas   = game.canvasEl.getContext('2d');
            game.canvas.width = config.width;
            game.canvas.height= config.height;
            game.canvasEl.setAttribute("width",config.width);
            game.canvasEl.setAttribute("height",config.height);
            if(config.scale) {
                game.scale = config.scale;
            }
            if(config.map) {
                game.loadMap(config.map);
            }
            if(config.sprite){
                game.loadSprite(config.sprite.file,config.sprite.size);
            }
            if(config.entities) {
                for(var i in config.entities) {
                    game.addEntity(config.entities[i]);
                }
            }
            game.updateInterval = setInterval(function() {
                game.update();
            },(1000/24));
            game.drawRequest = requestAnimationFrame(function(){
                game.draw()
            });
            game.bindEvents();
            game.config = config;
            config.run(game);
        };

        return game;
})();

