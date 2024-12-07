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

module.exports = {shuffleArray, generateID, send_data_to_players, disconnect_player, delete_game};