const path = require('path');

module.exports = function (deps) {

    return {
        getImage
    };

    function getImage(req, res) {
        const imageName = req.params.imageName;
        const filePath = path.join(__dirname, 'images', imageName);
        res.sendFile(filePath);
    }
};