// send test name to server
function initGame(event)
{
    let name = event.target.getAttribute('name');
    sock.send(JSON.stringify({
        type: "test_name",
        data: name
    }))
}

// send game settings to server and load create_profile.html
function confirmSettings()
{
    let nquestion = document.getElementById('nquestion').value;
    let timer = document.getElementById('timer').value;
    let level = document.getElementById('level').value; // 1 - 5
    sock.send(JSON.stringify({
        type: "test_settings",
        nquestion : nquestion,
        timer: timer,
        level: level
    }))
    changeContent("front/create_profile.html");
    document.getElementById('gameID').style.display = "block";
}

// if username is valid, send it and picture to server
function confirm_profile()
{
    let pseudo = document.getElementById('username').value;
    if (pseudo == "" || pseudo.length > 15 || !isAlphaNumeric(pseudo))
    {
        document.getElementById('error').innerHTML = "Invalid name";
        return ;
    }
    let picture = document.getElementById('picture').src;

    sock.send(JSON.stringify({
        type: "create_player",
        name: pseudo,
        picture: picture
    }))
}