const db       = require('../../config/db');

exports.authUser = (req, res, data) => {
    db.connection.query('SELECT * FROM `commission` WHERE `login`="' + data.login + '" AND `password`="' + data.password + '"', function(err, result) {
        if(result.length > 0){
            res.statusCode = 200;
            res.send(
                {
                    message: "COMMISSION",
                }
            );
        } else {
            if(data.login === "Admin" && data.password === "Admin"){
                res.statusCode = 200;
                res.send(
                    {
                        message: "ADMIN",
                    }
                );
            } else {
                res.statusCode = 200;
                res.send(
                    {
                        message: "USER NOT FOUND",
                    }
                );
            }
        }
    });
}