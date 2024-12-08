// send start_game message to server
function start_game()
{
    sock.send(JSON.stringify({
        type: "start_game"
    }))
}

// data[0] : question content
// data[1] : question number
// data[2] : answers array
function display_quiz(data)
{
    // initialize timer
    countdownSeconds = timer;
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    document.getElementById('question').textContent = data[0];
    document.getElementById('responseMessage').textContent = "";
    document.getElementById('questionNum').textContent = data[1];
    document.getElementById('questionLen').textContent = nquestion;
    display_answer_field(data[2]);
}

// display answerContainer according to difficulty level
// 1 - VERY EASY
// 2 - EASY
// 3 - MEDIUM
// 4 - HARD
// 5 - VERY HARD
function display_answer_field(answers)
{
    document.getElementById('answerContainer').style.display = "block";
    if (answers.length <= 1)
        return ;

    // create the following html element in answerContainer answer lenght times
    // <button onclick="validate_answer(event)" class="answerButtons">answer</button>
    document.getElementById("answerContainer").innerHTML = "";
    for (let i = 0; i < answers.length; i++)
    {
        let newButton = document.createElement("button");
        newButton.textContent = answers[i];
        newButton.addEventListener("click", validate_answer);
        newButton.classList.add("answerButtons");
        document.getElementById("answerContainer").appendChild(newButton);
    }
}

// get answer value and send it to server
function validate_answer(event)
{
    clearInterval(countdownInterval);

    let answer = "";
    if (event)
        answer = event.target.textContent;
    if (document.getElementById('answer'))
    {
        answer = document.getElementById('answer').value;
        document.getElementById('answer').value = "";
    }

    sock.send(JSON.stringify({
        type: "check_answer",
        data: answer.toLowerCase(),
        countdown: countdownSeconds
    }))
    document.getElementById('answerContainer').style.display = "none";
}