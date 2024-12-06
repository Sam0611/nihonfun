
let s = require('./server_conf.js');

const classes = require('./class.js');
const Game = classes.gameClass;
const Player = classes.playerClass;

const utils = require('./utils.js');
const send_data_to_players = utils.send_data_to_players;
const disconnect_player = utils.disconnect_player;
const delete_game = utils.delete_game;

let games = [];

// if all players are ready, send next question or the end of game
function continue_game(game)
{
    for (let i = 0; i < game.players.length; i++)
        if (game.players[i].ready == false)
            return ;

    game.index++;
    
    if (game.index < game.questionNumbers)
    {
        setTimeout(send_next_question, 3000, game);
    }
    else
    {
        setTimeout(send_data_to_players, 3000, game, "end_game", game.players);
        game.running = false;
    }
}

// send to all players data containing the question content, question index and number of question
// set players not ready
function send_next_question(game)
{
    data = [game.data[game.index][0], game.index + 1, game.questionNumbers];
    send_data_to_players(game, "new_question", data);
    for (let i = 0; i < game.players.length; i++)
        game.players[i].ready = false;
}

// player and his socket become disconnected
// if there is no player left, delete game
// update players list
// if is creator, it becomes another player
// continue game if all remaining players are ready
function exit_game(game, user, ws, isCreator)
{
    disconnect_player(game, user, ws);

    if (game.players.length == 0)
    {
        delete_game(game, games);
        return ;
    }

    send_data_to_players(game, "update_players_list", game.players);

    if (isCreator)
    {
        game.sockets[0].send(JSON.stringify({
            type: "new_game_creator"
        }))
    }

    continue_game(game);
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
            game.questionNumbers = message.nquestion > game.data.length ? game.data.length : message.nquestion;
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
            game.comingPlayers--;

            // send player list to all players
            send_data_to_players(game, "players_list", game.players);
        }

        
        /*  *   *   *   *   JOIN GAME   *   *   *   *   */

        
        // check if ID is valid
        // if game not running, join
        // if game running, access not granted
        if (message.type === "join_game")
        {
            // check ID
            const id = message.data;
            for (let i = 0; i < games.length; i++)
            {
                if (id == games[i].id)
                {
                    game = games[i];
                    break ;
                }
            }

            // id not valid, send error
            if (!game)
            {
                ws.send(JSON.stringify({
                    type: "wrong_game_id"
                }))
                return ;
            }
            
            // game hasn't started, join accepted
            if (!game.running)
            {
                ws.send(JSON.stringify({
                    type: "correct_game_id"
                }))
                game.comingPlayers++;
                return ;
            }

            // game is running
            // access not granted, send error
            game = null;
            ws.send(JSON.stringify({
                type: "cannot_join_running_game"
            }))
        }

        
        /*  *   *   *   *   SEND SETTINGS   *   *   *   *   */


        // get game settings
        if (message.type === "get_settings")
        {
            ws.send(JSON.stringify({
                type: "game_settings",
                name: game.name,
                nquestion: game.questionNumbers,
                level: game.level,
                timer: game.timer,
                isCreator: isCreator
            }))
        }

        
        /*  *   *   *   *   RUN GAME   *   *   *   *   */


        // send question data to players
        if (message.type === "start_game")
        {
            // cannot start while players are chosing profile
            if (game.comingPlayers)
            {
                ws.send(JSON.stringify({
                    type: "waiting_for_players"
                }))
                return ;
            }

            game.running = true;
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

            // if all players ready, send next question
            continue_game(game);
        }


        /*  *   *   *   *   EXIT GAME   *   *   *   *   */


        if (message.type === "test_exit")
        {
            exit_game(game, user, ws, isCreator);
            isCreator = false;
            game = null;
        }

        if (message.type === "new_game_creator")
        {
            isCreator = true;
            game.creator = user;
        }
        
    });

    ws.on('close', () => {

        if (!game)
            return ;

        exit_game(game, user, ws, isCreator);
        isCreator = false;
        game = null;
    });
    
});