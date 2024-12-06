const hiraganas = require('./hiraganas.js');
const katakanas = require('./katakanas.js');
const shuffleArray = require('./utils.js').shuffleArray;

class Game
{
    constructor(id, name)
    {
        this.id = id;
        this.name = name;
        this.questionNumbers = 0;
        this.level = "0";
        this.timer = 0;
        this.players = [];
        this.sockets = [];
        this.disconnectedPlayers = [];
        this.disconnectedSockets = [];
        this.creator = null;
        this.index = 0;
        this.running = false;
        this.comingPlayers = 1;

        if (name == "hiraganas")
            this.data = shuffleArray(hiraganas);
        else
            this.data = shuffleArray(katakanas);
    }
}

class Player
{
    constructor(name, picture)
    {
        this.name = name;
        this.picture = picture;
        this.points = 0;
        this.ready = true;
    }
}

module.exports.gameClass = Game;
module.exports.playerClass = Player;