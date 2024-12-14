// const utils = require('./utils/utils.js');
// const to_hiraganas = utils.to_hiraganas;

const words = [
    [
        "watashi", "anata", "kare", "kanojo", "watashi tachi", "karera", "kanojo tachi", "gakusei",
        "watashi no tomodachi", "anata no tomodachi", "kare no tomodachi", "kanojo no tomodachi", "watashi tachi no tomodachi", "anata tachi no tomodachi", "karera no tomodachi", "kanojo tachi no tomodachi",
        "watashi no sensei", "anata no sensei", "kare no sensei", "kanojo no sensei", "watashi tachi no sensei", "anata tachi no sensei", "karera no sensei", "kanojo tachi no sensei",
    ],
    [
        "gakkou", "ie", "heya", "niwa", "mise", "eigakan", "toshokan",
        "eki", "yama", "hayashi", "nihon", "umi",
        "eki no mae", "eki no ushiro", "eki no soba",
        "gakkou no mae", "gakkou no ushiro", "gakkou no soba",
        "mise no mae", "mise no ushiro", "mise no soba",
        "eigakan no mae", "eigakan no ushiro", "eigakan no soba",
        "toshokan no mae", "toshokan no ushiro", "toshokan no soba"
    ],
    [
        "ringo", "tamago", "kudamono", "yasai", "niku", "sakana", "mizu", "sake", "sushi",
        "hon", "shinbun", "manga", "ongaku", "eigo", "nihongo", "hiragana", "katakana", "kanji", "eiga", "hashi", "ai",
        "neko", "inu", "uma", "usagi", "nezumi",
        "watashi", "anata", "kare", "kanojo", "watashi tachi", "karera", "kanojo tachi", "tomodachi", "sensei", "kazoku",
        "watashi no inu", "anata no inu", "kare no inu", "kanojo no inu", "watashi tachi no inu", "anata tachi no inu", "karera no inu", "kanojo tachi no inu",
        "watashi no neko", "anata no neko", "kare no neko", "kanojo no neko", "watashi tachi no neko", "anata tachi no neko", "karera no neko", "kanojo tachi no neko"
    ],
    [
        "miru", "kau", "sagasu", "kiku", "tasukeru", "tsukau", "mitsukeru",
        "oyogu", "neru", "hashiru", "utau", "yasumu", "asobu", "hataraku",
        "taberu", "nomu", "yomu", "kaku", "matsu", "manabu"
    ]
];

const wordTypes = {
    "food": [
        "ie", "yama", "gakkou", "eki", "niwa", "hayashi", "nihon", "umi", "heya", "toshokan",
        "eki no mae", "eki no ushiro", "eki no soba",
        "gakkou no mae", "gakkou no ushiro", "gakkou no soba",
        "mise no mae", "mise no ushiro", "mise no soba",
        "eigakan no mae", "eigakan no ushiro", "eigakan no soba",
        "toshokan no mae", "toshokan no ushiro", "toshokan no soba",
        "taberu",
        "sakana", "ringo", "tamago", "niku", "kudamono", "yasai", "sushi"
    ],

    "drink": [
        "ie", "yama", "gakkou", "eki", "niwa", "hayashi", "nihon", "umi", "heya", "toshokan",
        "eki no mae", "eki no ushiro", "eki no soba",
        "gakkou no mae", "gakkou no ushiro", "gakkou no soba",
        "mise no mae", "mise no ushiro", "mise no soba",
        "eigakan no mae", "eigakan no ushiro", "eigakan no soba",
        "toshokan no mae", "toshokan no ushiro", "toshokan no soba",
        "nomu",
        "mizu", "sake"
    ],

    "reading": [
        "ie", "yama", "gakkou", "eki", "niwa", "hayashi", "nihon", "umi", "heya", "toshokan",
        "eki no mae", "eki no ushiro", "eki no soba",
        "gakkou no mae", "gakkou no ushiro", "gakkou no soba",
        "mise no mae", "mise no ushiro", "mise no soba",
        "eigakan no mae", "eigakan no ushiro", "eigakan no soba",
        "toshokan no mae", "toshokan no ushiro", "toshokan no soba",
        "yomu",
        "hon", "shinbun", "manga"
    ],

    "writing": [
        "ie", "yama", "gakkou", "eki", "niwa", "hayashi", "nihon", "umi", "heya", "toshokan",
        "eki no mae", "eki no ushiro", "eki no soba",
        "gakkou no mae", "gakkou no ushiro", "gakkou no soba",
        "mise no mae", "mise no ushiro", "mise no soba",
        "eigakan no mae", "eigakan no ushiro", "eigakan no soba",
        "toshokan no mae", "toshokan no ushiro", "toshokan no soba",
        "kaku",
        "hon", "nihongo", "hiragana", "katakana", "kanji", "eigo"
    ],

    "listening": [
        "ie", "yama", "gakkou", "eki", "niwa", "hayashi", "nihon", "umi", "heya", "toshokan",
        "eki no mae", "eki no ushiro", "eki no soba",
        "gakkou no mae", "gakkou no ushiro", "gakkou no soba",
        "mise no mae", "mise no ushiro", "mise no soba",
        "eigakan no mae", "eigakan no ushiro", "eigakan no soba",
        "toshokan no mae", "toshokan no ushiro", "toshokan no soba",
        "kiku",
        "ongaku", "nihongo", "eigo", "sensei"
    ],

    "watching": [
        "eigakan", "ie", "gakkou", "nihon", "heya", "toshokan",
        "miru",
        "eiga"
    ],

    "animal": [
        "ie", "yama", "niwa", "hayashi", "nihon", "heya",
        "eki no mae", "eki no ushiro", "eki no soba",
        "gakkou no mae", "gakkou no ushiro", "gakkou no soba",
        "mise no mae", "mise no ushiro", "mise no soba",
        "eigakan no mae", "eigakan no ushiro", "eigakan no soba",
        "toshokan no mae", "toshokan no ushiro", "toshokan no soba",
        "sagasu",
        "neko", "inu", "sakana", "usagi", "nezumi"
    ],

    "buying": [
        "mise", "nihon",
        "kau",
        "neko", "inu", "sakana", "uma", "usagi", "nezumi", "eiga", "ongaku", "hon", "shinbun", "manga", "mizu", "sake", "ringo", "tamago", "niku", "kudamono", "yasai", "sushi"
    ],

    "swimming": [
        "umi",
        "oyogu"
    ],

    "singing": [
        "ie", "heya", "gakkou", "niwa", "hayashi", "eki", "nihon", "umi", "yama", "mise",
        "eki no mae", "eki no ushiro", "eki no soba",
        "gakkou no mae", "gakkou no ushiro", "gakkou no soba",
        "mise no mae", "mise no ushiro", "mise no soba",
        "eigakan no mae", "eigakan no ushiro", "eigakan no soba",
        "toshokan no mae", "toshokan no ushiro", "toshokan no soba",
        "utau"
    ],

    "waiting": [
        "gakkou", "ie", "heya", "niwa", "mise", "eigakan", "toshokan", "eki", "yama", "hayashi", "umi",
        "eki no mae", "eki no ushiro", "eki no soba",
        "gakkou no mae", "gakkou no ushiro", "gakkou no soba",
        "mise no mae", "mise no ushiro", "mise no soba",
        "eigakan no mae", "eigakan no ushiro", "eigakan no soba",
        "toshokan no mae", "toshokan no ushiro", "toshokan no soba",
        "matsu",
        "watashi", "anata", "kare", "kanojo", "watashi tachi", "karera", "kanojo tachi", "tomodachi", "sensei", "kazoku"
    ],

    "helping": [
        "gakkou", "ie", "toshokan", "mise", "eki", "yama", "hayashi", "umi", "nihon",
        "eki", "yama", "hayashi", "nihon", "umi",
        "eki no mae", "eki no ushiro", "eki no soba",
        "gakkou no mae", "gakkou no ushiro", "gakkou no soba",
        "mise no mae", "mise no ushiro", "mise no soba",
        "eigakan no mae", "eigakan no ushiro", "eigakan no soba",
        "toshokan no mae", "toshokan no ushiro", "toshokan no soba",
        "tasukeru",
        "watashi", "anata", "kare", "kanojo", "watashi tachi", "karera", "kanojo tachi", "tomodachi", "kazoku"
    ],

    "using": [
        "gakkou", "ie", "nihon",
        "tsukau",
        "hashi"
    ],

    "working": [
        "gakkou", "ie", "nihon", "mise", "eigakan", "toshokan", "eki",
        "eki", "yama", "hayashi", "nihon", "umi",
        "eki no mae", "eki no ushiro", "eki no soba",
        "gakkou no mae", "gakkou no ushiro", "gakkou no soba",
        "mise no mae", "mise no ushiro", "mise no soba",
        "eigakan no mae", "eigakan no ushiro", "eigakan no soba",
        "toshokan no mae", "toshokan no ushiro", "toshokan no soba",
        "hataraku"
    ],

    "learning": [
        "gakkou", "ie", "heya", "toshokan", "nihon",
        "eki no mae", "eki no ushiro", "eki no soba",
        "gakkou no mae", "gakkou no ushiro", "gakkou no soba",
        "mise no mae", "mise no ushiro", "mise no soba",
        "eigakan no mae", "eigakan no ushiro", "eigakan no soba",
        "toshokan no mae", "toshokan no ushiro", "toshokan no soba",
        "manabu",
        "nihongo", "eigo", "kanji", "hiragana", "katakana"
    ],

    "finding": [
        "gakkou", "ie", "mise", "niwa", "eki", "nihon", "hayashi", "yama",
        "eki no mae", "eki no ushiro", "eki no soba",
        "gakkou no mae", "gakkou no ushiro", "gakkou no soba",
        "mise no mae", "mise no ushiro", "mise no soba",
        "eigakan no mae", "eigakan no ushiro", "eigakan no soba",
        "toshokan no mae", "toshokan no ushiro", "toshokan no soba",
        "mitsukeru",
        "hon", "shinbun", "manga", "hashi", "ai",
        "neko", "inu", "usagi", "nezumi",
        "ringo", "tamago", "kudamono", "yasai", "niku", "sakana", "mizu", "sake", "sushi",
        "watashi", "anata", "kare", "kanojo", "watashi tachi", "karera", "kanojo tachi", "tomodachi", "sensei", "kazoku",
        "watashi no inu", "anata no inu", "kare no inu", "kanojo no inu", "watashi tachi no inu", "anata tachi no inu", "karera no inu", "kanojo tachi no inu",
        "watashi no neko", "anata no neko", "kare no neko", "kanojo no neko", "watashi tachi no neko", "anata tachi no neko", "karera no neko", "kanojo tachi no neko"
    ]
};

const needObjectVerbs = ["miru", "kau", "sagasu", "kiku", "tasukeru", "tsukau", "mitsukeru"];
const intransitiveVerbs = ["oyogu", "neru", "hashiru", "utau", "yasumu", "asobu", "hataraku"];

const kanjis = {
    "watashi": "私", "kare": "彼", "kanojo": "彼女", "gakusei": "学生", "tomodachi": "友達", "sensei": "先生", "kazoku": "家族",
    "gakkou" : "学校", "ie": "家", "heya": "部屋", "niwa": "庭", "mise": "店", "eigakan": "映画館", "toshokan": "図書館",
    "eki": "駅", "yama": "山", "hayashi": "林", "nihon": "日本", "umi": "海",
    "mae": "前", "ushiro": "後ろ", "soba": "側",
    "ringo": "林檎", "tamago": "卵", "kudamono": "果物", "yasai": "野菜", "niku": "肉", "sakana": "魚", "mizu": "水", "sake": "酒",
    "hon": "本", "shinbun": "新聞", "manga": "漫画", "ongaku": "音楽", "eigo": "英語", "nihongo": "日本語", "kanji": "漢字", "eiga": "映画", "hashi": "箸", "ai": "愛",
    "neko": "猫", "inu": "犬", "uma": "馬", "usagi": "兔", "nezumi": "鼠",
    "miru": "見る", "kau": "買う", "sagasu": "探す", "kiku": "聞く", "tasukeru": "助ける", "tsukau": "使う", "mitsukeru": "見つける",
    "oyogu": "泳ぐ", "neru": "寝る", "hashiru": "走る", "utau": "歌う", "yasumu": "休む", "asobu": "遊ぶ", "hataraku": "働く",
    "taberu": "食べる", "nomu": "飲む", "yomu": "読む", "kaku": "書く", "matsu": "待つ", "manabu": "学ぶ"
};

const kanas = {
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

function to_kanji(str)
{
    let w = str.split(" ");
    let translated = "";
    for (let i = 0; i < w.length; i++)
    {
        if (kanjis[w[i]])
            translated += kanjis[w[i]];
        else
            translated += to_hiraganas(w[i]);
    }
    return (translated);
}

function get_type(word)
{
    let foundTypes = [];
    for (let type in wordTypes)
    {
        if (wordTypes[type].includes(word))
            foundTypes.push(type);
    }
    return (foundTypes);
}

function is_similar(subject, object)
{
    if (object.includes(subject))
        return (true);

    let w = subject.split(" ");
    if (subject.includes(object))
    {
        let i = w.indexOf(object);
        let j = w.indexOf("no", i);
        if (j != i + 1)
            return (true);
    }

    return (false);
}

const conjugaison = [
    "informal present affirmative", "informal present negative",
    "informal past affirmative", "informal past negative",
    "informal will affirmative", "informal will negative",
    "formal present affirmative", "formal present negative",
    "formal past affirmative", "formal past negative",
    "formal will affirmative", "formal will negative"
];

const verbalForms = {
    "formal": {
        "present": {"affirmative": "masu", "negative": "masen"},
        "past": {"affirmative": "mashita", "negative": "masen deshita"},
        "will": {"affirmative": "tai desu", "negative": "takunai desu"}
    },
    "informal": {
        "present": {"affirmative": "ru", "negative": "nai"},
        "past": {"affirmative": "ta", "negative": "nakatta"},
        "will": {"affirmative": "tai", "negative": "takunai"}
    }
};


function conjuguate(verb, t)
{
    let tense = conjugaison[t].split(" ");
    let conjuguatedStr = "";

    // mitsukeru in past tense only
    if (verb == "mitsukeru")
        tense[1] = "past";

    // first group verbs
    if ((verb.endsWith("eru") || verb.endsWith("iru")) && verb != "hashiru")
    {
        conjuguatedStr = verbalForms[tense[0]][tense[1]][tense[2]];
        return (conjuguatedStr);
    }

    // second group verbs

    // informal present affirmative form
    if (conjugaison[t] == "informal present affirmative")
    {
        conjuguatedStr = verb.substr(-2);
        if (verb.endsWith("tsu"))
            conjuguatedStr = verb.substr(-3);
        if (verb.endsWith("au"))
            conjuguatedStr = verb.substr(-1);
        return (conjuguatedStr);
    }

    // remove -u at the end
    verb = verb.slice(0, -1);

    if (verb.endsWith("ts"))
        verb = verb.slice(0, -1);
    conjuguatedStr = verb.substr(-1);
    if (conjuguatedStr == "a")
        conjuguatedStr = "";

    // all formal forms, and informal will form
    if (tense[0] == "formal" || tense[1] == "will")
    {
        if (conjuguatedStr == "s")
            conjuguatedStr += "h";
        if (conjuguatedStr == "t")
            conjuguatedStr = "ch";
        conjuguatedStr += "i" + verbalForms[tense[0]][tense[1]][tense[2]];
    }

    // informal present/past negative form
    if (tense[2] == "negative" && tense[0] == "informal" && (tense[1] == "present" || tense[1] == "past"))
    {
        if (conjuguatedStr.length == 0)
            conjuguatedStr = "w";
        conjuguatedStr += "a" + verbalForms[tense[0]][tense[1]][tense[2]];
    }

    // informal past affirmative form
    if (tense[0] == "informal" && tense[1] == "past" && tense[2] == "affirmative")
    {
        if (conjuguatedStr.length == 0 || conjuguatedStr == "t" || conjuguatedStr == "r")
            conjuguatedStr = "tta";
        else if (conjuguatedStr == "k")
            conjuguatedStr = "ita";
        else if (conjuguatedStr == "g")
            conjuguatedStr = "ida";
        else if (conjuguatedStr == "s")
            conjuguatedStr = "shita";
        else if (conjuguatedStr == "m" || conjuguatedStr == "n" || conjuguatedStr == "b")
            conjuguatedStr = "nda";
    }
    
    return (conjuguatedStr);
}

/*

SUJET + WA + LIEU + DE + CO + WO + VERBE

- sujet et / avec (to)
watashi ha tomodachi to eiga wo miru : je regarde un film avec un ami
watashi to tomodachi ha eiga wo miru : un ami et moi regardons un film

- aru/iru avec ga et ni
niwa ni neko ga iru
kare ha neko ga iru
watashi ha gakkou ni iru
il y a / avoir (ga aru/iru)

- verifier réponse FR

retraduire la phrase en japonais et comparer avec la phrase générée
vérifier les mots principaux

*/

class Word
{
    constructor(name)
    {
        this.name = name;
        this.hiraganas = to_hiraganas(name);
        this.type = get_type(name);
        this.particle = "";
    }
}

class Subject extends Word
{
    constructor(name)
    {
        super(name);
        this.particle = "ha";
    }
}

class Verb extends Word
{
    constructor(name)
    {
        super(name);

        // -1 never, 1 always, 0 optional
        if (needObjectVerbs.includes(this.name))
            this.needCO = 1;
        else if (intransitiveVerbs.includes(this.name))
            this.needCO = -1;
        else
            this.needCO = 0;
    }
}

class Place extends Word
{
    constructor(name)
    {
        super(name);
        this.particle = "de";
    }
}

class Object extends Word
{
    constructor(name)
    {
        super(name);
        this.particle = "wo";
    }
}

let generate_class = [
    (str) => {return (new Subject(str))},
    (str) => {return (new Place(str))},
    (str) => {return (new Object(str))},
    (str) => {return (new Verb(str))}
];

let dictionnary = [[], [], [], []];

function init_classes()
{
    for (let i = 0; i < words.length; i++)
    {
        for (let j = 0; j < words[i].length; j++)
        {
            dictionnary[i].push(generate_class[i](words[i][j]));
        }
    }
}

init_classes();

function generate_sentence()
{
    let sentence = "";
    let rd = Math.floor(Math.random() * dictionnary[3].length);
    let v = dictionnary[3][rd];
    let s = "";

    for (let i = 0; i < dictionnary.length - 1; i++)
    {
        rd = Math.floor(Math.random() * dictionnary[i].length);
        switch (i)
        {
            case 0: // subject
                s = dictionnary[i][rd];
                sentence += s.name + " ";
                sentence += s.particle + " ";
                break ;

            case 2: // CO
                if (v.needCO == -1)
                    break ;
                while (!dictionnary[i][rd].type.includes(v.type[0]) || is_similar(s.name, dictionnary[i][rd].name))
                    rd = Math.floor(Math.random() * dictionnary[i].length);

            case 1: // place
                if (v.type.length)
                    while (!dictionnary[i][rd].type.includes(v.type[0]))
                        rd = Math.floor(Math.random() * dictionnary[i].length);

            default:
                sentence += dictionnary[i][rd].name + " ";
                sentence += dictionnary[i][rd].particle + " ";
        }
    }
    sentence += v.name;
    return (sentence);
}