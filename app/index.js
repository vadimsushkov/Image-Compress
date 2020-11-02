const multer = require('multer');
const AppService = require('./service');
const compress_images = require("compress-images");
const path = require('path');

async function upload (req, file, cb){
    await AppService.checkPath();
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'public/uploads');
        },
        filename(req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()
            }${path.extname(file.originalname)}`);
        }
    });
    return multer({ storage });
}

async function compress (INPUT_path_to_images, OUTPUT_path, req, res){
   await compress_images(INPUT_path_to_images, OUTPUT_path, { compress_force: false,
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
            console.log("-------------");
            AppService.download(res, `${statistic.path_out_new}`);
        });
}

module.exports = {
    upload,
    compress,
};
