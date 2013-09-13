
(function(game){
    var c = 0;
    game.utils.addButton = function(text,fun) {
        var i = c + 1;
        c++;
        var button = {
            'name':text,
            'type':'button',
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
                canvas.fillText(text, x + 130, 50 * i + 35);
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
        game.addEntity(button);
    }
})(Game);
