// send exit message to server and return to index.html
function exit_test()
{
    sock.send(JSON.stringify({
        type: "test_exit"
    }))
    clearInterval(countdownInterval);
    changeContent("index.html");
    document.getElementById('gameID').style.display = "none";
    document.getElementById('playersListContainer').style.display = "none";
}