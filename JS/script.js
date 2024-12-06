
sock.onmessage = function(event) {

    let json = JSON.parse(event.data);

    // display game id
    if (json.type === "game_id")
    {
        document.getElementById('gameID').textContent = "ID : " + json.data;
    }

    // display game players
    if (json.type === "players_list")
    {
        changeContent("wait_room.html")
        .then( data => {
            sock.send(JSON.stringify({
                type: "get_settings"
            }))
        });

        document.getElementById('playersListContainer').style.display = "block";

        let players = json.data;
        let ul = document.getElementById('playersList');
        ul.innerHTML = "";

        let li;
        for (let i = 0; i < players.length; i++)
        {
            li = document.createElement('li');
            li.innerHTML = "<img src=" + players[i].picture + ">" + players[i].name;
            ul.appendChild(li);
        }
    }
    
    // display game settings
    if (json.type === "game_settings")
    {
        let settings = document.getElementById('game_settings');
        if (!settings)
            return ;
        settings.textContent = json.name + " Level " + json.level + ", time : " + json.timer;
        if (!json.isCreator)
            document.getElementById('start_game').style.display = "none";
    }
    
    // display name taken error
    if (json.type === "pseudo_error")
    {
        document.getElementById('error').innerHTML = "Name is taken";
    }
    
    // display wrong ID error
    if (json.type === "wrong_game_id")
    {
        document.getElementById('error').innerHTML = "Wrong id";
    }
    
    // join game by loading create_profile.html
    if (json.type === "correct_game_id")
    {
        changeContent("create_profile.html");
        document.getElementById('gameID').style.display = "block";
    }

    // display quiz elements
    if (json.type === "new_question")
    {
        if (!document.getElementById('question'))
        {
            changeContent("game.html")
            .then( data => {
                document.getElementById('question').textContent = json.data[0];
                document.getElementById('answerContainer').style.display = "block";
                document.getElementById('responseMessage').textContent = "";
                document.getElementById('questionNum').textContent = json.data[1];
                document.getElementById('questionLen').textContent = json.data[2];
            });
        }
        else
        {
            document.getElementById('question').textContent = json.data[0];
            document.getElementById('answerContainer').style.display = "block";
            document.getElementById('responseMessage').textContent = "";
            document.getElementById('questionNum').textContent = json.data[1];
            document.getElementById('questionLen').textContent = json.data[2];
            if (document.querySelector("input"))
                document.querySelector("input").focus();
        }
    }

    // display check answer message
    if (json.type === "check_answer")
    {
        let message = "";
        if (json.data == json.answer)
            message = json.data + " is a correct answer";
        else
            message = json.data + " is a wrong answer, correct answer is " + json.answer;
        document.getElementById('answerContainer').style.display = "none";
        document.getElementById('responseMessage').textContent = message;
    }

    // display players infos with score
    if (json.type === "end_game")
    {
        let players = json.data;
        let score = document.getElementById('scoreContainer');

        document.getElementById('question').textContent = "";
        document.getElementById('questionCounter').style.display = "none";
        document.getElementById('responseMessage').textContent = "";
        document.getElementById('playersListContainer').style.display = "none";

        for (let i = 0; i < players.length; i++)
            score.innerHTML += "<img src=" + players[i].picture + ">" + players[i].name + " : " + players[i].points + " pts<br>";
    }
};