
let s = require('./server_conf.js');

const utils = require('./utils/utils.js');
const send_data_to_players = utils.send_data_to_players;
const send_next_question = utils.send_next_question;
const continue_game = utils.continue_game;
const exit_game = utils.exit_game;

const init = require('./utils/init.js');
const init_game = init.init_game;
const init_player = init.init_player;

let games = [];

s.on('connection', (ws) => {
    
    let user;
    let game;
    let isCreator = false;
    
    ws.on('message', (message) => {

        message = JSON.parse(message);

        switch (message.type)
        {
            case "test_name": // create game with name received (message.data) and random ID
                game = init_game(games, message.data);
                break ;

            case "test_settings": // set game settings
                game.set_settings(message);
                games.push(game);
                isCreator = true;
                ws.send(JSON.stringify({
                    type: "game_infos",
                    data: [game.id, game.questionNumbers]
                }));
                break ;

            case "create_player": // create a player with a name and picture and add it to game players list
                user = init_player(game, ws, message);
                if (!user)
                    return ;
                if (isCreator)
                    game.creator = user;
                game.players.push(user);
                game.sockets.push(ws);
                game.comingPlayers--;
                send_data_to_players(game, "players_list", [game.players, game.name, game.level, game.timer, game.questionNumbers]);
                break ;
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
                    type: "error",
                    data: "Wrong id"
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
                type: "error",
                data: "Cannot join, game has already started"
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
                    type: "error",
                    data: "Cannot start the game while players are chosing a profile"
                }))
                return ;
            }

            game.running = true;
            send_next_question(game);
        }

        if (message.type === "check_answer")
        {
            let i = !game.revert ? 1 : 0;

            ws.send(JSON.stringify({
                type: "check_answer",
                data: message.data,
                answer: game.data[game.index][i]
            }))
            user.ready = true;

            // update player points
            if (message.data == game.data[game.index][i])
            {
                user.points++;
                if (message.countdown >= game.timer - 5)
                    user.points++;
            }
            else if (message.data != "")
                user.points--;

            // if all players ready, send next question
            continue_game(game);
        }


        /*  *   *   *   *   EXIT GAME   *   *   *   *   */


        if (message.type === "test_exit")
        {
            exit_game(game, games, user, ws, isCreator);
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

        exit_game(game, games, user, ws, isCreator);
        isCreator = false;
        game = null;
    });
    
});