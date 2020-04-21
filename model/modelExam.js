const db = require('./../Database')

module.exports.getExamById = function(req, res) {
    var exams = {
        "CodeExam": '',
        "Level": '',
        "grammar": [],
        "questionGrammar": [],

        "reading": [],
        "questionReading": [],
        "listening": [],
        "questionListening": []
    }
    res.send("result get exam id");
}

module.exports.update = (req, res) => {}
module.exports.getAll = (req, res) => {
    var qr = "SELECT * FROM exam";
    db.query(qr, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
}