const db = require('./../Database')

module.exports.getUserById = function(req, res) {
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
    var id = req.params.id;

    console.log(id)
    var qr = "SELECT * FROM exam WHERE exam.CodeExam =\'" + id + "\'";
    db.query(qr, function(err, result) {
        if (err) throw err;
        else {
            var jsonResult = JSON.parse(JSON.stringify(result));
            exams.CodeExam = id;
            exams.Level = result[0].Level;
            qr = "SELECT * FROM grammar WHERE grammar.CodeExam =\'" + id + "\' AND  grammar.Level = '" + exams.Level + "\'";
            db.query(qr, function(err, result_grammar) {
                var jsonResult_ = JSON.parse(JSON.stringify(result_grammar));
                exams.grammar = jsonResult_;
                qr = "SELECT * FROM questionGrammar AS G WHERE G.idGrammar =\'" + jsonResult_[0].id + "\'";
                db.query(qr, function(err, result_grammar_q) {
                    exams.questionGrammar = JSON.parse(JSON.stringify(result_grammar_q));
                    qr = "SELECT * FROM reading AS G WHERE G.CodeExam =\'" + id + "\'";
                    db.query(qr, function(err, result_read) {
                        exams.reading = JSON.parse(JSON.stringify(result_read));
                        qr = "SELECT * FROM questionReading AS G WHERE G.idReading =\'" + exams.grammar[0].id + "\'";
                        db.query(qr, function(err, result_read_q) {
                            exams.questionReading = JSON.parse(JSON.stringify(result_read_q));
                            res.send(exams);
                        })
                    })
                })
            })

        }
    })
}

module.exports.update = (req, res) => {
    var body = req.body;
    var CodeExam = body.CodeExam;
    var content = body.content;
    var qr = "UPDATE `grammar` SET content = \'" + content + "\' WHERE `grammar`.`CodeExam` = '" + CodeExam + "\'";
    console.log(qr);
    // db.query(qr)
    db.query(qr, function(err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });

}
module.exports.getAll = (req, res) => {
    var qr = "SELECT * FROM exam";
    db.query(qr, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
}