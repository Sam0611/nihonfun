// send start_game message to server
function start_game()
{
    sock.send(JSON.stringify({
        type: "start_game"
    }))
}

// get answer value and send it to server
function validate_answer()
{
    let answer = document.getElementById('answer').value;
    if (answer == "")
        return ;

    sock.send(JSON.stringify({
        type: "check_answer",
        data: answer.toLowerCase()
    }))
    document.getElementById('answer').value = "";
    document.getElementById('answerContainer').style.display = "none";
}