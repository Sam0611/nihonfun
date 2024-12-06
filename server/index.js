
let s = require('./server_conf.js');

const classes = require('./class.js');
const Game = classes.gameClass;
const Player = classes.playerClass;

const utils = require('./utils.js');
const send_data_to_players = utils.send_data_to_players;
const delete_player = utils.delete_player;
const delete_game = utils.delete_game;

let games = [];

function send_next_question(game)
{
    data = [game.data[game.index][0], game.index + 1, game.data.length];
    send_data_to_players(game, "new_question", data);
    for (let i = 0; i < game.players.length; i++)
        game.players[i].ready = false;
}

s.on('connection', (ws) => {
    
    let user;
    let game;
    let isCreator = false;
    
    ws.on('message', (message) => {

        message = JSON.parse(message);


        /*  *   *   *   *   INIT GAME   *   *   *   *   */


        // create game with name received (message.data) and random ID
        if (message.type === "test_name")
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
            game = new Game(id, message.data);
        }
        
        // add game settings
        if (message.type === "test_settings")
        {
            game.level = message.level;
            game.timer = message.timer;
            games.push(game);
            isCreator = true;

            // send game id to display
            ws.send(JSON.stringify({
                type: "game_id",
                data: game.id
            }));
        }

        // create a player with a name and picture
        // and add it to game players list
        if (message.type === "create_player")
        {
            if (!game)
                return ;

            // check if name is taken
            for (let i = 0; i < game.players.length; i++)
            {
                if (message.name == game.players[i].name)
                {
                    ws.send(JSON.stringify({
                        type: "pseudo_error"
                    }))
                    return ;
                }
            }

            user = new Player(message.name, message.picture);

            if (isCreator)
                game.creator = user;
            game.players.push(user);
            game.sockets.push(ws);
            // users.push(user);

            // send player list to all players
            send_data_to_players(game, "players_list", game.players);
        }

        
        /*  *   *   *   *   EXIT GAME   *   *   *   *   */

        
        // delete game from games list
        if (message.type === "test_exit")
        {
            delete_player(game, user, ws);
            send_data_to_players(game, "players_list", game.players);
            if (isCreator)
            {
                game.creator = null;
                delete_game(game, games);
            }
            isCreator = false;
        }

        
        /*  *   *   *   *   JOIN GAME   *   *   *   *   */

        
        // join game
        if (message.type === "join_game")
        {
            const id = message.data;
            for (let i = 0; i < games.length; i++)
            {
                if (id == games[i].id)
                {
                    game = games[i];
                    ws.send(JSON.stringify({
                        type: "correct_game_id"
                    }))
                    break ;
                }
            }
            ws.send(JSON.stringify({
                type: "wrong_game_id"
            }))
        }

        
        /*  *   *   *   *   SEND SETTINGS   *   *   *   *   */


        // get game settings
        if (message.type === "get_settings")
        {
            ws.send(JSON.stringify({
                type: "game_settings",
                name: game.name,
                level: game.level,
                timer: game.timer,
                isCreator: isCreator
            }))
        }

        
        /*  *   *   *   *   RUN GAME   *   *   *   *   */


        // send question data to players
        if (message.type === "start_game")
        {
            send_next_question(game);
        }

        if (message.type === "check_answer")
        {
            ws.send(JSON.stringify({
                type: "check_answer",
                data: message.data,
                answer: game.data[game.index][1]
            }))
            user.ready = true;

            if (message.data == game.data[game.index][1])
                user.points++;
            else
                user.points--;

            for (let i = 0; i < game.players.length; i++)
                if (game.players[i].ready == false)
                    return ;

            game.index++;
            
            if (game.index < game.data.length)
                setTimeout(send_next_question, 3000, game);
            else
                setTimeout(send_data_to_players, 3000, game, "end_game", game.players);
        }
        
    });

    ws.on('close', () => {

        if (!game)
            return ;

        delete_player(game, user, ws);

        send_data_to_players(game, "players_list", game.players);

        if (isCreator)
            delete_game(game, games);
        isCreator = false;

    });
    
});