// send start_game message to server
function start_game()
{
    sock.send(JSON.stringify({
        type: "start_game"
    }))
}

// data[0] : question content
// data[1] : question number
// data[2] : question total number
// data[3] : timer in seconds
function display_quiz(data)
{
    // initialize timer
    countdownSeconds = data[3];
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    document.getElementById('question').textContent = data[0];
    document.getElementById('answerContainer').style.display = "block";
    document.getElementById('responseMessage').textContent = "";
    document.getElementById('questionNum').textContent = data[1];
    document.getElementById('questionLen').textContent = data[2];
}

// get answer value and send it to server
function validate_answer()
{
    clearInterval(countdownInterval);

    let answer = document.getElementById('answer').value;

    sock.send(JSON.stringify({
        type: "check_answer",
        data: answer.toLowerCase(),
        countdown: countdownSeconds
    }))
    document.getElementById('answer').value = "";
    document.getElementById('answerContainer').style.display = "none";
}