const db = require('./../Database')
const formidable = require('formidable');

module.exports.uploadImg = (req, res) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = "public/images";
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.multiples = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({
                result: "failed",
                data: {},
                message: "Cannot upload image.error"
            })
            return;
        }
        var imgs = files[""];

        var fileNames = [];
        if (imgs.length > 0) {
            imgs.forEach(eachFile => {
                fileNames.push(eachFile)
            });
        } else {
            res.json({
                result: "ok",
                data: fileNames,
                message: "upload images successfully"
            })
        }
    })
}