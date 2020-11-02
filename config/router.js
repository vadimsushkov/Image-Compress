const express = require('express');
const bodyParser = require('body-parser');
const { req, file, cb } = require('express');
const { upload, compress } = require('../app/index');
const AppRouter = require('../app/router');

module.exports = {
    async init(app) {
        const router = express.Router();
``
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(express.static('public'));
        app.use('', AppRouter);

        const service = await upload(req, file, cb);

        //app.get('/', (req, res) => {
            //res.render('index');
       //     res.sendFile(path.resolve(`app/view/index.html`));
       // });
        app.post('/processimage', service.single('file'), (req, res) => {
            const INPUT_path_to_images = `public/uploads/${req.file.filename}`;
            const OUTPUT_path = `build/img/`;
            compress(INPUT_path_to_images, OUTPUT_path, req, res);
        });
        app.use(router);
    },
};
