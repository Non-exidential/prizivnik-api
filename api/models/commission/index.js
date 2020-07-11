const db       = require('../../config/db');

exports.getCommissions = (req, res) => {
    db.connection.query('SELECT * FROM `commission`', function(err, result) {
        console.log(result)
        res.statusCode = 200;
        res.send(
            {
                message: "OK",
                list: result
            }
        );
    });
}

exports.addCommission = (req, res, data) => {
    console.log(data)
    db.connection.query('SELECT * FROM `commission` WHERE `login`="' + data.login + '"', function (err, result){
        if(result.length > 0){
            res.statusCode = 400;
            res.send(
                {
                    message: "LOGIN CONSIST"
                }
            );
        } else {
            db.connection.query('INSERT INTO `commission`(`login`, `password`, `secondName`, `firstName`, `lastName`) VALUES ("' + data.login + '", "' + data.password + '", "' + data.secondName + '", "' + data.firstName + '", "' + data.lastName + '")', function(err, result) {
                console.log(err)
                res.statusCode = 201;
                res.send(
                    {
                        message: "ADDED"
                    }
                );
            });
        }
    })
}


exports.deleteCommission = (req, res, data) => {
    db.connection.query('DELETE FROM `commission` WHERE `id`="' + data.id + '"', function(err, result) {
        if(result.affectedRows === 1){
            res.statusCode = 200;
            res.send(
                {
                    message: "DELETED"
                }
            );
        } else {
            res.statusCode = 404;
            res.send(
                {
                    message: "COMMISSION NOT FOUND"
                }
            );
        }
    });
}

exports.updateCommission = (req, res, data) => {
    db.connection.query('UPDATE `commission` SET `login`="' + data.login + '",`password`="' + data.password + '",`secondName`="' + data.secondName + '",`firstName`="' + data.firstName + '",`lastName`="' + data.lastName + '" WHERE id="' + data.id + '" AND `id` IS NOT NULL', function(err, result) {
        console.log(result)
        if(result.affectedRows === 1) {
            res.status(200);
            res.send(
                {
                    message: "UPDATED"
                }
            );
        } else {
            res.statusCode = 404;
            res.send(
                {
                    message: "COMMISSION NOT FOUND"
                }
            );
        }
    });
}