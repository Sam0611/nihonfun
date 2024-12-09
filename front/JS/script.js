
sock.onmessage = function(event) {

    let json = JSON.parse(event.data);

    switch (json.type)
    {
        case "game_infos": // display game id (data[0]) and update question number (data[1])
            document.getElementById('gameID').textContent = "ID : " + json.data[0];
            nquestion = json.data[1];
            break ;

        case "players_list": // display game players and settings
            let player_list;
            [player_list, test_name, level, timer, nquestion] = json.data;
            changeContent("front/wait_room.html")
            .then( data => {
                let settings = document.getElementById('game_settings');
                if (!settings)
                    return ;
                settings.textContent = test_name + " Level " + level + ", time : " + timer + ", question : " + nquestion;
                if (!isCreator)
                    document.getElementById('start_game').style.display = "none";
            });

            document.getElementById('playersListContainer').style.display = "block";
            update_players_list(player_list);
            break ;

        case "update_players_list": // update game players list
            update_players_list(json.data);
            break ;

        case "error": // display error message
            document.getElementById('error').textContent = json.data;
            break ;

        case "correct_game_id": // join game by loading create_profile.html
            changeContent("front/create_profile.html");
            document.getElementById('gameID').style.display = "block";
            break ;

        case "new_question": // display quiz elements
            if (!document.getElementById('question'))
            {
                changeContent("front/game.html")
                .then( data => {display_quiz(json.data);});
            }
            else
            {
                display_quiz(json.data);
                if (document.querySelector("input"))
                    document.querySelector("input").focus();
            }
            break ;

        case "check_answer": // display check answer message
            let message = "";
            if (json.data == json.answer)
                message = json.data + " is a correct answer";
            else if (json.data == "")
                message = json.data + "Time's up ! Correct answer is " + json.answer;
            else
                message = json.data + " is a wrong answer, correct answer is " + json.answer;
            document.getElementById('answerContainer').style.display = "none";
            document.getElementById('responseMessage').textContent = message;
            break ;

        case "end_game": // display players infos with score
            let players = json.data;
            let score = document.getElementById('scoreContainer');

            document.getElementById('question').textContent = "";
            document.getElementById("countdown").textContent = "";
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
            break ;
    }
};