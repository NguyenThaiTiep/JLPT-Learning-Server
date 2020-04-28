const db = require('./../Database')
const formidable = require('formidable');
const fs = require('fs');
const util = require('util');

const queryFunc = util.promisify(db.query).bind(db);

const levels = ['N1', 'N2', 'N3', 'N4', 'N5'];
const types = ['vocabulary', 'grammar', 'kanji']

module.exports.add = async(req, res) => {
    var body = req.body;
    var level = body.level;
    if (levels.indexOf(level) == -1) res.send({ status: "fail", message: "level invalid" });

    // add exam
    var qr = "INSERT INTO exam (`id`, `level`) VALUE(NULL,\'" + level + "\')";
    console.log(qr);
    var exam = await queryFunc(qr);
    var id = exam.insertId;
    var grammar = await addGrammar(id);
    var reading = await addReading(id);
    var listening = await addListening(id);

    function addGrammar(id) {
        var add = async(idQ) => {
            var grammarList = body.grammar;
            row = 0;
            while (grammarList[row]) {
                var grammar = grammarList[row];
                var qr = "INSERT INTO examGrammar (`id`, `title`, `CodeExamG`) VALUE(NULL,\'" +
                    grammar.title + "\',\'" +
                    id + "\'" +
                    ")";
                var grammarObject = await queryFunc(qr);
                var idGrammarObject = grammarObject.insertId;

                var qs = grammar.question;
                var index = 0;
                while (qs[index]) {
                    var questions = qs[index];
                    var qr = "INSERT INTO examGrammarQuestion (`id`, `idGrammar`, `question`,`answer1`,`answer2`,`answer3`,`answer4`,`result`) VALUE(NULL,\'" +
                        idGrammarObject + "\',\'" +
                        questions.question + "\',\'" +
                        questions.answer1 + "\',\'" +
                        questions.answer2 + "\',\'" +
                        questions.answer3 + "\',\'" +
                        questions.answer4 + "\',\'" +
                        questions.result + "\'" +
                        ")";
                    db.query(qr, (err, result) => {
                        if (err) console.log(err);
                    })
                    index++;
                }
                row++;
            }
        }
        var b = add(id);
    }

    function addReading(id) {
        var add = async(idR) => {
            var readingList = body.reading;
            row = 0;
            console.log(readingList.length)
            while (readingList[row]) {
                var reading = readingList[row];
                var qr = "INSERT INTO examReading (`id`, `title`, `CodeExamR`, `content`) VALUE(NULL,\'" +
                    reading.title + "\',\'" +
                    idR + "\',\'" +
                    reading.content + "\'" +
                    ")";
                var readingObject = await queryFunc(qr);
                var idReadingObject = readingObject.insertId;
                var qs = reading.question;
                var index = 0;
                while (qs[index]) {
                    var questions = qs[index];
                    var qr = "INSERT INTO examReadingQuestion (`id`, `idReading`, `question`,`answer1`,`answer2`,`answer3`,`answer4`,`result`) VALUE(NULL,\'" +
                        idReadingObject + "\',\'" +
                        questions.question + "\',\'" +
                        questions.answer1 + "\',\'" +
                        questions.answer2 + "\',\'" +
                        questions.answer3 + "\',\'" +
                        questions.answer4 + "\',\'" +
                        "1" + "\'" +
                        ")";
                    db.query(qr, (err, result) => {
                        if (err) console.log(err);
                    })
                    index++;
                }
                row++;
            }
        }
        var b = add(id);
    }

    function addListening(id) {
        var add = async(idL) => {
            var listeningList = body.listening;
            row = 0;
            if (listeningList.length === 0) return;
            while (listeningList[row]) {
                var listening = listeningList[row];
                var qr = "INSERT INTO examListening (`id`, `title`, `CodeExamL`, `imageUrl`,`audioUrl`) VALUE(NULL,\'" +
                    listening.title + "\',\'" +
                    id + "\'," +
                    "NULL, NULL" +
                    ")";
                var listeningObject = await queryFunc(qr);
                var idListeningObject = listeningObject.insertId;

                var qs = listening.question;
                var index = 0;
                while (qs[index]) {
                    var questions = qs[index];
                    var qr = "INSERT INTO examListeningQuestion (`id`, `idListening`, `question`,`answer1`,`answer2`,`answer3`,`answer4`,`result`) VALUE(NULL,\'" +
                        idListeningObject + "\',\'" +
                        questions.question + "\',\'" +
                        questions.answer1 + "\',\'" +
                        questions.answer2 + "\',\'" +
                        questions.answer3 + "\',\'" +
                        questions.answer4 + "\',\'" +
                        questions.result + "\'" +
                        ")";
                    db.query(qr, (err, result) => {
                        if (err) console.log(err);
                    })
                    index++;
                }
                row++;
            }
        }


        var b = add(id);
    }

    // function uploadFile(file) {
    //     var form = new formidable.IncomingForm();
    //     form.uploadDir = "public/images";
    //     form.keepExtensions = true;
    //     form.maxFieldsSize = 10 * 1024 * 1024;
    //     form.multiples = true;
    //     form.parse((err, fields, files) => {
    //         if (err) {
    //             res.json({
    //                 result: "failed",
    //                 data: {},
    //                 message: "Cannot upload image.error"
    //             })
    //             return;
    //         }
    //         var imgs = files[""];

    //         var fileNames = [];

    //         if (imgs.path) fileNames.push(imgs.path.split("\\").pop())
    //         if (imgs.length >= 0) {
    //             imgs.forEach(eachFile => {
    //                 fileNames.push(eachFile.path.split("\\").pop())
    //             });
    //         }
    //     })
    // }
    res.sendStatus(200);
}

module.exports.remove = (req, res) => {

}
module.exports.getAll = (req, res) => {

}
module.exports.getExamById = (req, res) => {

}