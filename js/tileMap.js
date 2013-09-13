
(function(game){

    game.utils.loadMap = function(map) {
        game.config.map = map;
        var bkp = game.entities.slice();
        game.entities = [];
        var y,x;
        for(y=0;y<map.tiles.length;y++) {
            for(x=0;x<map.tiles[y].length;x++) {
                var tile = map.tiles[y][x];
                var tileCfg = {
                    name: "-map-r:"+y+"-c:"+x,
                    x: x * game.sprites.size,
                    y: y * game.sprites.size,
                    autoDraw: true,
                    sprite: {
                        y: tile[0],
                        x: tile[1]
                    }
                };
                try {
                    var tileCfgExtra = game.config.map.sprite.config[tile[0]][tile[1]];
                    if(typeof tileCfgExtra == 'string') tileCfgExtra = {type:tileCfgExtra};
                    if(tileCfgExtra.type == 'floor') tileCfgExtra.walkable = true;
                    for(var k in tileCfgExtra) {
                        tileCfg[k] = tileCfgExtra[k];
                    }
                } catch(e) {}
                game.addEntity(tileCfg);
            }
        }
        game.config.diffY = (game.canvas.height / 2) - (y * game.sprites.size);
        game.config.diffX = (game.canvas.width  / 2) - (x * game.sprites.size);
        if(map.entities) {
            for(var y=0; y<map.entities.length;y++) {
                game.addEntity(map.entities[y]);
            }
        }
        for(var i=0;i<bkp.length;i++) {
            if(!bkp[i].name.match(/^-map-/)) {
                game.entities.push(bkp[i]);
            }
        }
    };

    game.utils.switchMap = function(to) {
        var map = game.config.quest.maps[to.map];
        var entities = game.entities.slice();
        for(var i in entities) {
            game.removeEntity(entities[i]);
        }
        game.config.map = map;
        game.utils.loadMap(map);
        game.addEntity(game.config.hero);
        game.config.hero.x = to.x * game.sprites.size;
        game.config.hero.y = to.y * game.sprites.size;
    };

})(Game);


