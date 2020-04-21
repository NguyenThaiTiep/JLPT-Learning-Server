const db = require('./../Database')

const levels = ['N1', 'N2', 'N3', 'N4', 'N5'];
const types = ['vocabulary', 'grammar', 'kanji']
module.exports.getPracticeById = (req, res) => {
    var type = req.params.type;
    var level = req.params.level;
    var id = req.params.id;
    if (levels.indexOf(level) == -1) res.send("level invalid");
    if (types.indexOf(type) == -1) res.send("type invalid");
    else {
        var qr = "SELECT * FROM questionPractice AS T WHERE T.level =\'" + level + "\' AND T.type = \'" + type + "\' AND T.idRLG = \'" + id + "\'";
        console.log(qr);
        db.query(qr, function(err, result) {
            if (err) throw err;
            else {
                res.send(result);
            }
        })

    }

}
module.exports.getAll = (req, res) => {
    var type = req.params.type;
    var level = req.params.level;

    if (levels.indexOf(level) == -1) res.send("level invalid");
    if (types.indexOf(type) == -1) res.send("type invalid");
    else {

        var qr = "SELECT * FROM " + type + "practice AS T WHERE T.level =\'" + level + "\'";
        db.query(qr, function(err, result) {
            if (err) throw err;
            else {
                res.send(result);
            }
        })

    }
}

module.exports.add = (req, res) => {
    var body = req.body;
    var level = body.level;
    var type = body.type;

    var qr = "INSERT INTO " + type + "practice(`id`, `level`) VALUES (NULL, \'" + level + "\')";
    db.query(qr, function(err, result) {
        if (err) throw err;
        else {
            console.log(result.affectedRows + " record(s) updated");
            addQuestion(result.insertId);
        }
    })

    function addQuestion(idRLG) {
        var qs = body.question;
        var row = 0;
        while (qs[row]) {
            var question = qs[row];
            qr = "INSERT INTO questionPractice(`id`, `question`, `answer1`, `answer2`, `answer3`, `answer4`, `result`, `type`, `level`, `idRLG`)" +
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
            db.query(qr, function(err, result) {
                if (err) throw err;
                else {
                    console.log(result.affectedRows + " record(s) updated");
                }
            })
            row++;
        }
    }

}
module.exports.remove = (req, res) => {
    var body = req.body;
    var id = body.id;
    var type = body.type;

    // xoa practice
    var qr = "DELETE FROM " + type + "practice WHERE id = " + id;
    db.query(qr, function(err, result) {
        if (err) throw err;
        else {
            console.log("Number of records deleted: " + result.affectedRows);
        }
    })

    qr = "DELETE FROM questionPractice WHERE idRLG = " + id;
    db.query(qr, function(err, result) {
        if (err) throw err;
        else {
            console.log("Number of records deleted: " + result.affectedRows);
        }
    })
}