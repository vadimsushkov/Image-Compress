const { Router } = require('express');
//const { req, file, cb } = require('express');
//const { upload, compress } = require('../app/index');


const router = Router();
//const service = await upload(req, file, cb);

router.get('/', (req, res) => {
    res.render('../app/view/index.ejs');
    //res.sendFile(path.resolve(`app/view/index.html`));
})

//router.post('/processimage', service.single('file'), (req, res) => {
 //   const INPUT_path_to_images = `public/uploads/${req.file.filename}`;
//    const OUTPUT_path = `build/img/`;
 //   compress(INPUT_path_to_images, OUTPUT_path, req, res);
//});

module.exports = router;
