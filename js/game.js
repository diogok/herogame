
Game = (function(){
    var game = {
        canvas: null,
        canvasEl: null,
        updateInterval: null,
        drawRequest: null,
        events: {},
        entities: [],
        beforeUpdate: [],
        afterUpdate: [],
        beforeDraw: [],
        afterDraw: [],
        beforeAddEntity: [],
        afterAddEntity: [],
        beforeRemoveEntity: [],
        afterRemoveEntity: [],
        onClick: [],
        onKeyDown: [],
        onKeyUp: [],
        onKeyPress: [],
        beforeRun: [],
        afterRun:[],
        utils: {},
        plugins: {},
        config: {}
    };

    game.winGame = function() {
    };

    game.gameOver = function() {
    };

    game.addEntity = function(entity) {
        entity.beforeDraw = [];
        entity.afterDraw = [];
        entity.beforeUpdate = [];
        entity.afterUpdate = [];
        for(var i in game.beforeAddEntity) {
            game.beforeAddEntity[i](entity);
        }
        game.entities.push(entity);
        for(var i in game.afterAddEntity) {
            game.afterAddEntity[i](entity);
        }
    };

    game.removeEntity = function(entity) {
        for(var i in game.beforeRemoveEntity) {
            game.beforeRemoveEntity[i](entity);
        }
        var entities = game.entities.slice();
        var max = entities.length;
        for(var i =0;i<max;i++) {
            if(entities[i].name == entity.name) {
                delete entities[i];
            }
        }
        game.entities = entities.filter(function(e) { return typeof e != 'undefined'}) ;
        for(var i in game.afterRemoveEntity) {
            game.afterRemoveEntity[i](entity);
        }
    };

    game.getEntity = function(name) {
        var entities = game.entities.slice();
        var max = entities.length;
        for(var i =0;i<max;i++) {
            if(entities[i].name == name) {
                return entities[i];
            }
        }
    };

    game.draw = function() {
        game.canvas.clearRect(0,0,game.canvas.width,game.canvas.height);
        for(var i in game.beforeDraw) {
            game.beforeDraw[i](game.canvas);
        }
        var entities = game.entities.slice();
        for(var i=0;i<entities.length;i++) {
            for(var ii in entities[i].beforeDraw){
                entities[i].beforeDraw[ii](game.canvas,entities[i],game);
            }
            if(entities[i].draw) {
                entities[i].draw(game.canvas,entities[i],game);
            }
            for(var ii in entities[i].afterDraw){
                entities[i].afterDraw[ii](game.canvas,entities[i],game);
            }
        }
        for(var i in game.afterDraw) {
            game.afterDraw[i](game.canvas);
        }
        game.drawRequest = requestAnimationFrame(function(){
            game.draw()
        });
    };


    game.update = function() {
        for(var i in game.beforeUpdate) {
            game.beforeUpdate[i](game.events);
        }
        var entities = game.entities.slice();
        for(var i=0;i<entities.length;i++) {
            for(var ii in entities[i].beforeUpdate){
                entities[i].beforeUpdate[ii](game.events,entities[i],game);
            }
            if(!entities[i]) continue;
            if(entities[i].update){
                entities[i].update(game.events,entities[i],game);
            }
            if(!entities[i]) continue;
            for(var ii in entities[i].afterUpdate){
                entities[i].afterUpdate[ii](game.events,entities[i],game);
            }
        }
        for(var i in game.afterUpdate) {
            game.afterUpdate[i](game.events);
        }
        game.events = {};
    };

    game.bindEvents = function() {
        game.canvasEl.addEventListener('click',function(evt) {
            game.events.click = {evt: evt};
            for(var i in game.onClick) {
                game.onClick[i](game.events.click);
            }
        },false);
        window.addEventListener('keydown',function(evt) {
            game.events.keydown = {evt:evt};
            for(var i in game.onKeyDown) {
                game.onKeyDown[i](game.events.keydown);
            }
            game.events.keydown[evt.keyCode] = true;
        });
        window.addEventListener('keypress',function(evt) {
            game.events.keypress = {evt:evt};
            for(var i in game.onKeyPress) {
                game.onKeyPress[i](game.events.keypress);
            }
            game.events.keypress[evt.charCode] = true;
        });
        window.addEventListener('keyup',function(evt) {
            game.events.keyup = {};
            for(var i in game.onKeyUp) {
                game.onKeyUp[i](game.events.keyup);
            }
            game.events.keyup[evt.keyCode] = true;
        });
    };

    game.run = function(config) {
        for(var i in game.beforeRun) {
            game.beforeRun[i](config);
        }
        game.canvasEl = document.getElementById(config.id);
        game.canvas   = game.canvasEl.getContext('2d');
        game.canvas.width = config.width;
        game.canvas.height= config.height;
        game.canvasEl.setAttribute("width",config.width);
        game.canvasEl.setAttribute("height",config.height);
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
        for(var i in game.afterRun) {
            game.afterRun[i](config);
        }
    };

    return game;
})();

