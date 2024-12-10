// convert string to hiraganas
function to_hiraganas(str)
{
    let translated = "";
    let tmp;
    let vowels = "aiueoy";
    let i = 0;
    while (str[i])
    {
        tmp = "";
        while (str[i] && (!kanas[tmp] || (tmp == "n" && vowels.includes(str[i]))))
        {
            if (str[i] != " ")
            {
                if (!vowels.includes(str[i]) && str[i] != "n" && str[i] == str[i + 1])
                {
                    tmp = "っ";
                    i++;
                    break ;
                }
                tmp += str[i];
            }
            i++;
        }
        if (kanas[tmp])
            translated += kanas[tmp];
    }
    return (translated);
}

let kanas = {
    "a": "あ", "ka": "か", "sa": "さ", "ta": "た", "na": "な", "ha": "は", "ma": "ま", "ya": "や", "ra": "ら", "wa": "わ",
    "i": "い", "ki": "き", "shi": "し", "chi": "ち", "ni": "に", "hi": "ひ", "mi": "み", "ri": "り",
    "u": "う", "ku": "く", "su": "す", "tsu": "つ", "nu": "ぬ", "fu": "ふ", "mu": "む", "yu": "ゆ", "ru": "る",
    "e": "え", "ke": "け", "se": "せ", "te": "て", "ne": "ね", "he": "へ", "me": "め", "re": "れ",
    "o": "お", "ko": "こ", "so": "そ", "to": "と", "no": "の", "ho": "ほ", "mo": "も", "yo": "よ", "ro": "ろ", "wo": "を",

    "ga": "が", "gi": "ぎ", "gu": "ぐ", "ge": "げ", "go": "ご",
    "za": "ざ", "ji": "じ", "zu": "ず", "ze": "ぜ", "zo": "ぞ",
    "da": "だ", "de": "で", "do": "ど",
    "ba": "ば", "bi": "び", "bu": "ぶ", "be": "べ", "bo": "ぼ",
    "pa": "ぱ", "pi": "ぴ", "pu": "ぷ", "pe": "ぺ", "po": "ぽ",

    "kya": "きゃ", "kyu": "きゅ", "kyo": "きょ",
    "sha": "しゃ", "shu": "しゅ", "sho": "しょ",
    "cha": "ちゃ", "chu": "ちゅ", "cho": "ちょ",
    "nya": "にゃ", "nyu": "にゅ", "nyo": "にょ",
    "hya": "ひゃ", "hyu": "ひゅ", "hyo": "ひょ",
    "mya": "みゃ", "myu": "みゅ", "myo": "みょ",
    "rya": "りゃ", "ryu": "りゅ", "ryo": "りょ",
    "gya": "ぎゃ", "gyu": "ぎゅ", "gyo": "ぎょ",
    "ja": "じゃ", "ju": "じゅ", "jo": "じょ",
    "bya": "びゃ", "byu": "びゅ", "byo": "びょ",
    "pya": "ぴゃ", "pyu": "ぴゅ", "pyo": "ぴょ",
    "n": "ん", "っ": "っ"
};

module.exports = {to_hiraganas};