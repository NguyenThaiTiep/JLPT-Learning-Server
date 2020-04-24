const db = require('./../Database')
const formidable = require('formidable');
const fs = require('fs');
const fileContent = ["image/jpg", "image/jpeg", "image/png", "ia"]
module.exports.uploadFile = async(req, res) => {
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

        if (imgs.path) fileNames.push(imgs.path.split("\\").pop())
        if (imgs.length >= 0) {
            imgs.forEach(eachFile => {
                fileNames.push(eachFile.path.split("\\").pop())
            });
        }

        res.json({
            fileNames
        })
    })
}
module.exports.getFile = (req, res) => {
    var img = "public/images/" + req.params.name;
    var type = req.params.type;
    var tail = img.split('.').pop();
    var content_type = type + "/" + tail;
    fs.readFile(img, (err, imgData) => {
        if (err) {
            res.send({ status: "fail", message: "file invalid" });
            return;
        };
        res.writeHead(200, { 'Content-Type': content_type });
        res.end(imgData);
    })
}