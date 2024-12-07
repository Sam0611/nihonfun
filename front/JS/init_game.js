
let test_name;
let nquestion;
let timer;
let level;
let isCreator = false;

// send test name to server
function initGame(event)
{
    test_name = event.target.getAttribute('name');
    sock.send(JSON.stringify({
        type: "test_name",
        data: test_name
    }))
}

// send game settings to server and load create_profile.html
function confirmSettings()
{
    nquestion = document.getElementById('nquestion').value;
    timer = document.getElementById('timer').value;
    level = document.getElementById('level').value; // 1 - 5
    isCreator = true;
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