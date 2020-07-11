const db       = require('../../config/db');

exports.addPassport = (req, res, series, number, issued) => {
    db.connection.query('SELECT * FROM `passport` WHERE `series`="' + series + '" AND `number`="' + number + '"', function (err, result) {

        if (result.length === 0) {
            db.connection.query('INSERT INTO `passport`(`series`, `number`, `issued`) VALUES ("' + series + '", "' + number + '", "' + issued + '")', function (err, result) {
                db.connection.query('SELECT `id` FROM `passport` WHERE WHERE `series`="' + series + '" AND `number`="' + number + '"')
            });
        }
    })
}
