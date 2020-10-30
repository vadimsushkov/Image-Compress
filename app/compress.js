

module.exports = compress_images(INPUT_path_to_images, OUTPUT_path, { compress_force: false,
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
