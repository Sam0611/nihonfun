function validate(event, fct)
{
    let valid = event.which;
    if (valid == 13)
        fct();
}

function isAlphaNumeric(str)
{
    var code;
  
    for (let i = 0; i < str.length; i++)
    {
        code = str.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) // lower alpha (a-z)
        {
            return false;
        }
    }
    return true;
}

let photo = img[0];
function change_picture(x)
{
    let i = 0;
    while (photo != img[i] && i != img.length - 1)
         i++;
    i += x;
    if (i == img.length)
        i = 0;
    if (i == -1)
        i = img.length - 1;
    photo = img[i];
    document.getElementById('picture').src = "img_profil/" + photo;
}