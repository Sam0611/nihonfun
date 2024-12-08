var countdownSeconds = 10;
var countdownInterval;

function updateCountdown()
{
    var countdownElement = document.getElementById("countdown");
    countdownElement.textContent = "00:";
    if (countdownSeconds < 10)
        countdownElement.textContent += "0";
    countdownElement.textContent += countdownSeconds;
    if (countdownSeconds == 0)
        validate_answer(null);
    countdownSeconds--;
}