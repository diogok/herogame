
(function(game){

    game.graph = {};

    game.beforeUpdate.push(function(events){
        var entities = game.entities;

        for(var i in entities) { // nodes
            if(entities[i].walkable) {
                var yy = game.utils.getTileY(entities[i]);
                var xx = game.utils.getTileX(entities[i]);
                game.graph[yy+'x'+xx] = {};
            }
        }

        for(var i in entities) { // edges
            if(!entities[i].walkable) continue;

            var yy = game.utils.getTileY(entities[i]);
            var xx = game.utils.getTileX(entities[i]);
            if(game.graph[(yy + 1)+'x'+xx]) { // reverse north
                game.graph[(yy + 1)+'x'+xx][yy+'x'+xx] = 1;
            }
            if(game.graph[(yy - 1)+'x'+xx]) { // reverse south
                game.graph[(yy - 1)+'x'+xx][yy+'x'+xx] = 1;
            }
            if(game.graph[yy+'x'+(xx -1)]) { // reverse east
                game.graph[yy+'x'+(xx -1)][yy+'x'+xx] = 1;
            }
            if(game.graph[yy+'x'+(xx +1)]) { // reverse west
                game.graph[yy+'x'+(xx +1)][yy+'x'+xx] = 1;
            }
        }

        for(var i in entities) { // clean up
            if(!entities[i].walkable && !entities[i].isChar) {
                var yy = game.utils.getTileY(entities[i]);
                var xx = game.utils.getTileX(entities[i]);
                for(var ii in game.graph) {
                    if(game.graph[ii][yy+'x'+xx]) {
                        delete game.graph[ii][yy+'x'+xx];
                    }
                }
                delete game.graph[yy+'x'+xx];
            }
        }
    });

    game.beforeAddEntity.push(function(entity) {
        if(entity.isChar) {
            entity.afterUpdate.push(function(events,entity,game){
                if(!entity.moveTo) return;
                var eY = game.utils.getTileY(entity);
                var eX = game.utils.getTileX(entity);
                var tY = game.utils.getTileY(entity.moveTo);
                var tX = game.utils.getTileX(entity.moveTo);

                var map = {};
                for(var i in game.graph) {
                    map[i] = game.graph[i];
                }

                var g = {},c=eY+'x'+eX,n = (eY -1)+'x'+eX, s=(eY+1)+'x'+eX,w=eY+'x'+(eX-1),e=eY+'x'+(eX+1);
                if(map[n]) { g[n]=1; map[n][c]=1; }
                if(map[s]) { g[s]=1; map[s][c]=1; }
                if(map[e]) { g[e]=1; map[e][c]=1; }
                if(map[w]) { g[w] =1; map[w][c] =1; }
                map[c] = g;

                var graph = new Graph(map);
                var path  = graph.findShortestPath(eY+'x'+eX,tY+'x'+tX);
                if(!path || (entity.x == entity.moveTo.x && entity.y == entity.moveTo.y)) {
                    delete entity.moveTo;
                    return;
                }
                var next = [entity.x,entity.y];
                if(path[1]) {
                    next = path[1].split('x').map(function(i){return i * game.sprites.size});
                } else {
                    next = path[0].split('x').map(function(i){return i * game.sprites.size});
                }
                var nextTile = game.utils.getEntityAt(next[0] / game.sprites.size,next[1] / game.sprites.size);
                if(!nextTile || ( !nextTile.walkable && nextTile.name != entity.name )) {
                    if(!path[1]) {
                        delete entity.moveTo;
                        return;
                    } else {
                        next = path[0].split('x').map(function(i){return i * game.sprites.size});
                    }
                }
                if(!entity._to) entity._to = 'y';
                if(entity._to == 'y') {
                    if(next[0] > entity.y) entity.y += 2;
                    else if(next[0] < entity.y) entity.y -= 2;
                    else entity._to = 'x';
                } else {
                    if(next[1] > entity.x) entity.x += 2;
                    else if(next[1] < entity.x) entity.x -= 2;
                    else entity._to = 'y';
                }
            });
        }
    });

})(Game);

