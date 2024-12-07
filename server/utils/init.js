const utils = require('./utils.js');

const classes = require('./class.js');
const Game = classes.gameClass;
const Player = classes.playerClass;

// generate random ID, check if it exists and create game
function init_game(games, test_name)
{
    const generateID = utils.generateID;
    let id = generateID();
    for (let i = 0; i < games.length; i++)
    {
        if (id == games[i].id)
        {
            id = generateID();
            i = -1;
        }
    }
    return (new Game(id, test_name));
}

// check if username is available and create player
function init_player(game, sock, data)
{
    if (!game)
        return null;

    for (let i = 0; i < game.players.length; i++)
    {
        if (data.name == game.players[i].name)
        {
            sock.send(JSON.stringify({
                type: "error",
                data: "Name is taken"
            }))
            return null;
        }
    }

    return (new Player(data.name, data.picture));
}

module.exports = {init_game, init_player};