
var HeroGame = (function(){
    HeroGame = {};

    var config = {
        id: "game",
        width: 860,
        height: 640,
        scale: 2,
        sprite: {
            file:"assets/sprites-16x16.png",
            size: 16 
        }
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
        items: []
    };


    HeroGame.intro = function(game) {
        game.utils.addButton('New Game',function(){
            game.config.quest = quest;
            game.config.hero = hero;
            game.utils.switchMap(game.config.quest.start);
            var intro = game.config.quest.intro.reverse();
            for(var i in intro) {
                game.utils.showMessage(intro[i],5000 * intro.length);
            }
            return true;
        });

        game.utils.addButton('Load Game',function(){
            var save = window.localStorage.getItem('save');
            if(save) {
                var save = JSON.parse(save);
                game.config.quest = save.quest;
                game.config.hero = save.hero;
                game.utils.switchMap(save.map);
                return true;
            } else {
                game.utils.showMessage("Sorry, no saved game available.");
                return false;
            }
        });

        game.utils.addButton('About & Credits',function() {
            window.open('README.html','README','toolbar=no,width=640,height=480');
            return false;
        });

        game.utils.showMessage('Click to move.');
        game.utils.showMessage('Click to interact.');
        game.utils.showMessage('Click to attack.');
        game.utils.showMessage('Click to survive.');
    };


    HeroGame.start = function() {
        Game.afterRun.push(function(){
            HeroGame.intro(Game);
        });
        Game.run(config);
    };

    return HeroGame;
})();

