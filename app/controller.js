const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const compress_images = require("compress-images");
const dir = 'public';
const subDirectory = 'public/uploads';

module.exports = {
    init(app) {
        const controller = express.Router();

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(express.static('public'));

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            fs.mkdirSync(subDirectory);
        }

        const storage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, 'public/uploads');
            },
            filename(req, file, cb) {
                cb(null, `${file.fieldname}-${Date.now()
                }${path.extname(file.originalname)}`);
            },
        });
        const upload = multer({ storage });

        app.get('/', (req, res) => {res.sendFile(`${__dirname}/index.html`);});
        app.post('/processimage', upload.single('file'), (req, res) => {
            const INPUT_path_to_images = `public/uploads/${req.file.filename}`;
            const OUTPUT_path = `build/img/`;
            compress_images(INPUT_path_to_images, OUTPUT_path, { compress_force: false,
                    statistic: true, autoupdate: true }, false,
                { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
                { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
                { svg: { engine: "svgo", command: "--multipass" } },
                { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
                function (error, completed, statistic) {
                    console.log("-------------");
                    console.log(error);
                    console.log(completed);
                    console.log(statistic);
                    res.download(`build/img/${req.file.filename}`, (err) => {
                        if (err) throw err;
                    });
                    console.log("-------------");
                }
            );
        });
        app.use(controller);
    },
};
