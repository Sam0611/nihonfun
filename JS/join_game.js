// get ID value and send it to server
function join_game()
{
    let id = document.getElementById('toJoinId').value;
    document.getElementById('gameID').textContent = "ID : " + id;
    sock.send(JSON.stringify({
        type: "join_game",
        data: id
    }))
}