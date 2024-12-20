const hiraganas = require('../ressources/hiraganas.js');
const katakanas = require('../ressources/katakanas.js');
const kanjis = require('../ressources/kanjis.js');
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
        this.revert = false;

        switch (name)
        {
            case "hiraganas":
                this.data = shuffleArray(hiraganas);
                break ;
            case "katakanas":
                this.data = shuffleArray(katakanas);
                break ;
            case "kanjis":
                this.data = shuffleArray(kanjis);
                break ;
        }
    }

    set_settings(data)
    {
        this.questionNumbers = data.nquestion > this.data.length ? this.data.length : data.nquestion;
        this.level = data.level;
        this.timer = data.timer;
        this.revert = data.revert;
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