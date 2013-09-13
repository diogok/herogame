
(function(game){

    game.sprites = {size:1};
    game.config.scale = 1;
    game.config.diffX = 0;
    game.config.diffY = 0;
    game.config.quest = null;

    game.gameOver = function() {
        var end = game.config.quest.badEnding.reverse();
        for(var i in end) {
            game.utils.showMessage(end[i],10000 * end.length);
        }
    };

    game.winGame = function() {
        var end = game.config.quest.ending.reverse();
        for(var i in end) {
            game.utils.showMessage(end[i],10000 * end.length);
        }
    };

    game.utils.getTileX = function(entity) {
        return Math.floor(entity.x / game.sprites.size);
    };

    game.utils.getTileY = function(entity) {
        return Math.floor(entity.y / game.sprites.size);
    };

    game.utils.near = function(a,b,t) {
       return a.x >= (b.x - t) &&
              a.x <= (b.x + t) &&
              a.y >= (b.y - t) &&
              a.y <= (b.y + t) ;
    };

    game.utils.nearTile = function(a,b) {
        return game.utils.near(a,b,game.sprites.size);
    };

    game.utils.eventNearTile = function(a,e) {
        return game.utils.nearTile(a,{x:e.x * game.sprites.size,y:e.y * game.sprites.size});
    };

    game.utils.getEntityAt = function(yyy,xxx) {
        var r = null;

        var entities = game.entities.slice();
        for(var i in entities) {
            var yy = Math.floor(entities[i].y / game.sprites.size) ;
            var xx = Math.floor(entities[i].x / game.sprites.size) ;
            if(xx == xxx && yy == yyy) {
                r = entities[i];
            }
        }
        return r;
    };

    game.utils.loadSprite = function(file,size) {
        var image = new Image();
        image.size = size;
        image.onload =  function() {
            game.sprites = image;
        };
        image.src = file;
    };

    game.beforeAddEntity.push(function(entity){
        if(entity.autoDraw) {
            entity.draw = function(canvas,entity,game) {
                var sprite = game.sprites;
                canvas.drawImage(
                    sprite,
                    entity.sprite.x * sprite.size,
                    entity.sprite.y * sprite.size,
                    sprite.size,
                    sprite.size,
                    ( entity.x  * game.config.scale ) + game.config.diffX,
                    ( entity.y  * game.config.scale ) + game.config.diffY,
                    sprite.size * game.config.scale,
                    sprite.size * game.config.scale
                );
            };
        }
    });

    game.onClick.push(function(event) {
        var y,x;
        if(game.sprites) {
            y = Math.floor((event.evt.layerY - game.config.diffY) / (game.sprites.size * game.config.scale)) ;
            x = Math.floor((event.evt.layerX - game.config.diffX) / (game.sprites.size * game.config.scale)) ;
        } else {
            y = event.evt.layerY;
            x = event.evt.layerX;
        }
        event.x = x;
        event.y = y;
        try {
            var tile = game.utils.getEntityAt(y,x);
            if(tile != null) {
                event.tile = tile;
            }
        } catch(e) { 
        }
    });

    game.beforeRun.push(function(config) {
        if(config.scale) {
            game.config.scale = config.scale;
        }
        if(config.sprite) {
            game.utils.loadSprite(config.sprite.file,config.sprite.size);
        }
    });

})(Game);
