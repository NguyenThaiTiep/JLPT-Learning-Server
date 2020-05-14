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
                var qr = "INSERT INTO examgrammar (`id`, `title`, `CodeExamG`) VALUE(NULL,\'" +
                    grammar.title + "\',\'" +
                    id + "\'" +
                    ")";
                var grammarObject = await queryFunc(qr);
                var idGrammarObject = grammarObject.insertId;

                var qs = grammar.question;
                var index = 0;
                while (qs[index]) {
                    var questions = qs[index];
                    var qr = "INSERT INTO examgrammarquestion (`id`, `idGrammar`, `question`,`answer1`,`answer2`,`answer3`,`answer4`,`result`) VALUE(NULL,\'" +
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
            while (readingList[row]) {
                var reading = readingList[row];
                var qr = "INSERT INTO examreading (`id`, `title`, `CodeExamR`, `content`) VALUE(NULL,\'" +
                    reading.title + "\',\'" +
                    idR + "\',\'" +
                    reading.content + "\'" +
                    ")";
                console.log(qr)
                var readingObject = await queryFunc(qr);
                var idReadingObject = readingObject.insertId;

                var qs = reading.question;
                var index = 0;
                while (qs[index]) {
                    var questions = qs[index];
                    var qr = "INSERT INTO examreadingquestion (`id`, `idReading`, `question`,`answer1`,`answer2`,`answer3`,`answer4`,`result`) VALUE(NULL,\'" +
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
                var qr = "INSERT INTO examlistening (`id`, `title`, `CodeExamL`, `imageUrl`,`audioUrl`) VALUE(NULL,\'" +
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
                    var qr = "INSERT INTO examlisteningquestion (`id`, `idListening`, `question`,`answer1`,`answer2`,`answer3`,`answer4`,`result`) VALUE(NULL,\'" +
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
    res.sendStatus(200);
}

module.exports.remove = async(req, res) => {
    var body = req.body;
    var id = body.id;
    var qr = `DELETE FROM exam WHERE id = ${id} `
    var result = await queryFunc(qr);
    if (result.affectedRows == 0) res.send({ status: "fail", message: "not found" });
    else res.send({ status: "ok", message: "deleted" });
}
module.exports.getAll = async(req, res) => {
    var qr = 'SELECT * FROM exam';
    var result = await queryFunc(qr);

    res.send((result));
}
module.exports.getExamById = async(req, res) => {
    var id = req.params.id;
    var examObject = {}

    // get exam
    var qr = `SELECT * FROM exam WHERE id = ${id}`
    var exam = await queryFunc(qr);
    if (exam.length == 0) res.send({ status: "fail", message: "not found" });

    // get grammar exam
    var qr = `SELECT * FROM examgrammar WHERE CodeExamG = ${id}`
    var examGrammar = await queryFunc(qr);
    getQuestion(examGrammar, "Grammar");

    //get reading
    var qr = `SELECT * FROM examreading WHERE CodeExamR = ${id}`
    var examReading = await queryFunc(qr);
    getQuestion(examReading, "Reading");

    // get listening
    var qr = `SELECT * FROM examlistening WHERE CodeExamL = ${id}`
    var examListening = await queryFunc(qr);
    getQuestion(examListening, "Listening");

    examObject.id = id;
    examObject.level = exam.level;

    examObject.examGrammar = examGrammar;
    examObject.examReading = examReading;
    examObject.examListening = examListening;
    res.send(examObject);


    function getQuestion(ExamType, type) {
        var getQuestionExam = async(part, typeLesson) => {
            var idPart = part.id;
            var idFK = `id${type}`
            var nameTable = `exam${typeLesson}question`;

            var qr = `SELECT * FROM ${nameTable} WHERE ${idFK} = ${idPart}`
            var result = await queryFunc(qr);
            part.question = result;
            return part;
        }
        var typeLesson = type.toLowerCase();
        ExamType.forEach(element => {
            var a = getQuestionExam(element, typeLesson)
        });
        return;
    }
}