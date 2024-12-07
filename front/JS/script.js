
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
        changeContent("front/wait_room.html")
        .then( data => {
            sock.send(JSON.stringify({
                type: "get_settings"
            }))
        });

        document.getElementById('playersListContainer').style.display = "block";
        update_players_list(json.data);
    }

    // update game players list
    if (json.type === "update_players_list")
    {
        update_players_list(json.data);
    }
    
    // display game settings
    if (json.type === "game_settings")
    {
        let settings = document.getElementById('game_settings');
        if (!settings)
            return ;
        settings.textContent = json.name + " Level " + json.level + ", time : " + json.timer + ", question : " + json.nquestion;
        if (!json.isCreator)
            document.getElementById('start_game').style.display = "none";
    }

    // display waiting for players message
    if (json.type === "waiting_for_players")
    {
        document.getElementById('error').textContent = "Cannot start the game while players are chosing a profile";
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

    // display forbidden access error when game is running
    if (json.type === "cannot_join_running_game")
    {
        document.getElementById('error').innerHTML = "Cannot join, game has already started";
    }
    
    // join game by loading create_profile.html
    if (json.type === "correct_game_id")
    {
        changeContent("front/create_profile.html");
        document.getElementById('gameID').style.display = "block";
    }

    // display quiz elements
    if (json.type === "new_question")
    {
        if (!document.getElementById('question'))
        {
            changeContent("front/game.html")
            .then( data => {
                display_quiz(json.data);
            });
        }
        else
        {
            display_quiz(json.data);
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
        else if (json.data == "")
            message = json.data + "Time's up ! Correct answer is " + json.answer;
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

        // sort players by their points
        let tmp;
        for (let i = 0; i < players.length - 1; i++)
        {
            if (players[i].points < players[i + 1].points)
            {
                tmp = players[i + 1];
                players[i + 1] = players[i];
                players[i] = tmp;
                i = -1;
            }
        }

        for (let i = 0; i < players.length; i++)
            score.innerHTML += i + 1 + ". <img src=" + players[i].picture + ">" + players[i].name + " : " + players[i].points + " pts<br>";
    }
};