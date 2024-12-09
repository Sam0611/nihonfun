function shuffleArray(toShuffle)
{
    let shuffled = [];
    let cpy = Array.from(toShuffle);

    while (cpy.length > 0)
    {
        let len = cpy.length;
        let rd = Math.floor(Math.random() * len);
        shuffled.push(cpy[rd]);
        cpy[rd] = cpy[len - 1];
        cpy.pop();
    }
    return shuffled;
}

function generateID()
{
    let id = "";
    let len = id.length;
    while (len < 6)
    {
        let toAdd = Math.floor(Math.random() * 10).toString();
        if (id.length < 3 || toAdd != id[len - 1] || toAdd != id[len - 2] || toAdd != id[len - 3])
            id += toAdd;
        len = id.length;
    }
    return id;
}

function send_data_to_players(game, type, data)
{
    for (let i = 0; i < game.sockets.length; i++)
    {
        game.sockets[i].send(JSON.stringify({
            type: type,
            data: data
        }))
    }
}

// if game is running, put user and socket in disconnected array
// delete user in game players list
// delete socket in game sockets list
function disconnect_player(game, user, sock)
{
    if (game.running)
    {
        game.disconnectedPlayers.push(user);
        game.disconnectedSockets.push(sock);
    }

    let i = game.players.indexOf(user);
    if (i != -1)
        game.players.splice(i, 1);

    i = game.sockets.indexOf(sock);
    if (i != -1)
        game.sockets.splice(i, 1);
}

function delete_game(game, games)
{
    let i = -1;
    if (game)
        i = games.indexOf(game);
    if (i != -1)
        games.splice(i, 1);
    game = null;
}

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

// send to all players data containing the question content, question index
// set players not ready
function send_next_question(game)
{
    let i = !game.revert ? 0 : 1; // question index
    let j = !game.revert ? 1 : 0; // answer index
    let answers = [game.data[game.index][j]];
    switch (game.level)
    {
        case "4": // answer + 3
            push_answers(game, answers, 3);
        case "3": // answer + 2
            push_answers(game, answers, 2);
        case "2": // answer + 2
            push_answers(game, answers, 2);
        case "1": // answer + 1
            push_answers(game, answers, 1);
        answers = shuffleArray(answers);
    }

    // if kanji test very hard, 12 answers
    if (game.name == "kanjis" && game.level == "5")
    {
        push_answers(game, answers, 11);
        answers = shuffleArray(answers);
    }

    data = [game.data[game.index][i], game.index + 1, answers];
    send_data_to_players(game, "new_question", data);
    for (let n = 0; n < game.players.length; n++)
        game.players[n].ready = false;
}

function push_answers(game, answers, n)
{
    let j = !game.revert ? 1 : 0;
    let len = game.data.length;
    let rd;
    let to_insert;
    while (n)
    {
        rd = Math.floor(Math.random() * len);
        to_insert = game.data[rd][j];
        for (let i = 0; i < answers.length; i++)
        {
            if (to_insert == answers[i])
                to_insert = "";
        }
        if (to_insert)
        {
            answers.push(to_insert);
            n--;
        }
    }
}

// player and his socket become disconnected
// if there is no player left, delete game
// update players list
// if is creator, it becomes another player
// continue game if all remaining players are ready
function exit_game(game, games, user, ws, isCreator)
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

module.exports = {shuffleArray, generateID, send_data_to_players, disconnect_player, delete_game, continue_game, exit_game, send_next_question};