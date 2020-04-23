const db = require('./../Database')
const util = require('util');

var queryFunc = util.promisify(db.query).bind(db);

const levels = ['N1', 'N2', 'N3', 'N4', 'N5'];
const types = ['vocabulary', 'grammar', 'kanji']
module.exports.getPracticeById = async(req, res) => {
    var type = req.params.type;
    var level = req.params.level;
    var id = req.params.id;
    if (levels.indexOf(level) == -1) res.send("level invalid");
    if (types.indexOf(type) == -1) res.send("type invalid");
    else {
        var qr = "SELECT * FROM questionpractice AS T WHERE T.level =\'" + level + "\' AND T.type = \'" + type + "\' AND T.idRLG = \'" + id + "\'";
        var practice = await queryFunc(qr);
        res.send(practice);
    }
}
module.exports.getAll = async(req, res) => {
    var type = req.params.type;
    var level = req.params.level;

    if (levels.indexOf(level) == -1) res.send("level invalid");
    if (types.indexOf(type) == -1) res.send("type invalid");
    else {
        var qr = "SELECT * FROM " + type + "practice AS T WHERE T.level =\'" + level + "\'";
        var rows = await queryFunc(qr);
        var result = (rows.length == 0) ? "Not Found practice" : rows;
        res.send(result);
    }
}

module.exports.add = async(req, res) => {
    var body = req.body;
    var level = body.level;
    var type = body.type;

    var qr = "INSERT INTO " + type + "practice(`id`, `level`) VALUES (NULL, \'" + level + "\')";
    var practiceRow = await queryFunc(qr);

    var idRLG = practiceRow.insertId;
    var rs = await add(idRLG);
    res.send(JSON.parse(JSON.stringify(rs)));

    function add(idRLG) {
        var qs = body.question;
        if (qs.length === 0) return ("No question add to database")
        var row = 0;
        while (qs[row]) {
            var question = qs[row];
            qr = "INSERT INTO questionpractice(`id`, `question`, `answer1`, `answer2`, `answer3`, `answer4`, `result`, `type`, `level`, `idRLG`)" +
                "VALUES (NULL, \'" + question.answer1 + "\'," +
                "\'" + question.answer1 + "\'," +
                "\'" + question.answer2 + "\'," +
                "\'" + question.answer3 + "\'," +
                "\'" + question.answer4 + "\'," +
                "\'" + question.result + "\'," +
                "\'" + type + "\'," +
                "\'" + level + "\'," +
                "\'" + idRLG + "\'" +
                ")";
            var result = queryFunc(qr);
            row++;
        }
        return "success";
    }
}
module.exports.remove = async(req, res) => {
    var body = req.body;
    var id = body.id;
    var type = body.type;

    // xoa practice
    var qr = "DELETE FROM " + type + "practice WHERE id = " + id;
    var DeletePractice = await queryFunc(qr);
    qr = "DELETE FROM questionpractice WHERE idRLG = \'" + id +
        "\' AND type = \'" + type + "\'";
    var DeleteQuestion = await queryFunc(qr);
    res.send("Delete success");
}
module.exports.getAllByLevel = async(req, res) => {
    var practice = {}
    var level = req.params.level;
    if (levels.indexOf(level) == -1) { res.send("level invalid"); return; }

    //get grammarPractice
    var qrG = "SELECT * FROM grammarpractice AS T WHERE T.level =\'" + level + "\'";
    var grammarPractice = await queryFunc(qrG);

    var qrV = "SELECT * FROM vocabularypractice AS T WHERE T.level =\'" + level + "\'";
    var VocabularyPractice = await queryFunc(qrV);

    var qrK = "SELECT * FROM kanjipractice AS T WHERE T.level =\'" + level + "\'";
    var KanjiPractice = await queryFunc(qrK);

    practice.kanji = KanjiPractice;
    practice.vocabulary = VocabularyPractice;
    practice.grammar = grammarPractice;
    res.send(practice);
}