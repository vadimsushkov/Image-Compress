const fs = require('fs');
const dir = 'public';
const subDirectory = 'public/uploads';

module.exports = {

    async checkPath() {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            fs.mkdirSync(subDirectory);
        }
    },

    async download (res, path) {
        res.download( path, (err) => {
            if (err) throw err;
        });
    }

}
