
Game = (function(){
    var game = {
        canvas: null,
        canvasEl: null,
        updateInterval: null,
        drawRequest: null,
        events: {},
        entities: [],
        beforeRun: [],
        afterRun:[],
        utils: {},
        plugins: {},
        config: {},
        listeners: {}
    };

    game.winGame = function() {
    };

    game.gameOver = function() {
    };

    game.on = function(evt,fun){
        if(!fun) return game.listeners[evt] || [];
        if(!game.listeners[evt]) game.listeners[evt] = [fun]; 
        else game.listeners[evt].push(fun);
    };

    game.over = function(evt,args) {
        for(var i in game.on(evt)) game.on(evt)[i].apply(game,args);
    };

    game.addEntity = function(entity) {
        entity.listeners = {}
        entity.on = function(evt,fun) {
            if(!fun) return entity.listeners[evt] || [];
            if(!entity.listeners[evt]) entity.listeners[evt] = [fun]; 
            else entity.listeners[evt].push(fun);
        };
        entity.over = function(evt,args) {
            for(var i in entity.on(evt)) entity.on(evt)[i].apply(entity,args);
        };

        game.over('beforeAddEntity',[entity]);
        game.entities.push(entity);
        game.over('afterAddEntity',[entity]);
    };

    game.removeEntity = function(entity) {
        game.over('beforeRemoveEntity',[entity]);
        var entities = game.entities.slice();
        var max = entities.length;
        for(var i =0;i<max;i++) {
            if(entities[i].name == entity.name) {
                delete entities[i];
            }
        }
        game.entities = entities.filter(function(e) { return typeof e != 'undefined'}) ;
        game.over('afterRemoveEntity',[entity]);
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
        game.over('beforeDraw',[game.canvas]);
        var entities = game.entities.slice();
        for(var i=0;i<entities.length;i++) {
            entities[i].over('beforeDraw',[game.canvas,entities[i],game]);
            if(entities[i].draw) {
                entities[i].draw(game.canvas,entities[i],game);
            }
            entities[i].over('afterDraw',[game.canvas,entities[i],game]);
        }
        game.over('afterDraw',[game.canvas]);
        game.drawRequest = requestAnimationFrame(function(){
            game.draw()
        });
    };


    game.update = function() {
        game.over('beforeUpdate',[game.events]);
        var entities = game.entities.slice();
        for(var i=0;i<entities.length;i++) {
            entities[i].over('beforeUpdate',[game.events,entities[i],game]);
            if(!entities[i]) continue;
            if(entities[i].update){
                entities[i].update(game.events,entities[i],game);
            }
            if(!entities[i]) continue;
            entities[i].over('afterUpdate',[game.events,entities[i],game]);
        }
        game.over('afterUpdate',[game.events]);
        game.events = {};
    };

    game.bindEvents = function() {
        game.canvasEl.addEventListener('click',function(evt) {
            game.events.click = {evt: evt};
            game.over('onClick',[game.events.click]);
        },false);
        window.addEventListener('keydown',function(evt) {
            game.events.keydown = {evt:evt};
            game.events.keydown[evt.keyCode] = true;
            game.over('onKeyDown',[game.events.keydown]);
        });
        window.addEventListener('keypress',function(evt) {
            game.events.keypress = {evt:evt};
            game.events.keypress[evt.charCode] = true;
            game.over('onKeyPress',[game.events.keypress]);
        });
        window.addEventListener('keyup',function(evt) {
            game.events.keyup = {};
            game.events.keyup[evt.keyCode] = true;
            game.over('onKeyUp',[game.events.keyup]);
        });
    };

    game.run = function(config) {
        game.over('beforeRun',[config]);
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
        game.over('afterRun',[config]);
    };

    return game;
})();

