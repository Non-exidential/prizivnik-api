const db       = require('../../config/db');

exports.addCall = (req, res, part_number, type_of_army, year_of_call) => {
    db.connection.query('SELECT `id` from `call` WHERE `part_number`="' + part_number + '" AND `type_of_army`="' + type_of_army + '" AND `year_of_call`="' + year_of_call + '"', function (err, result) {
        if (result.length === 0) {
            db.connection.query('INSERT INTO `call`(`part_number`, `type_of_army`, `year_of_call`) VALUES ("' + part_number + '", "' + type_of_army + '", "' + year_of_call + '")');
        }
    })
}
