const Passport = require("../passport");
const Call     = require("../call");
const db       = require('../../config/db');

exports.getConscripts = (req, res) => {
    db.connection.query('SELECT `conscript`.id as conscript_id, conscript.*, `passport`.*, `call`.* FROM conscript LEFT JOIN `passport` ON conscript.passport_id=passport.id LEFT JOIN `call` ON conscript.call_id=`call`.id GROUP BY conscript.id', function(err, result) {
        res.statusCode = 200;
        res.send(
            {
                message: "OK",
                list: result
            }
        );
    });
}

exports.getConscriptsById = (req, res, data) => {
    db.connection.query('SELECT conscript.id AS conscript_id, conscript.* , passport.*, `call`.* FROM conscript LEFT JOIN passport ON conscript.passport_id=passport.id LEFT JOIN `call` ON conscript.call_id=call.id WHERE conscript.id="' + data.id + '" GROUP BY conscript.id', function(err, result) {
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

exports.getConscriptsBySearch = (req, res, data) => {
    db.connection.query('SELECT conscript.id AS conscript_id, conscript.* , `passport`.*, `call`.* FROM conscript LEFT JOIN `passport` ON conscript.passport_id=passport.id LEFT JOIN `call` ON conscript.call_id=`call`.id WHERE secondName="' + data.str + '" OR birth="' + data.str + '" OR `series`="' + data.str + '" OR `number`="' + data.str + '" GROUP BY conscript.id', function(err, result) {
        res.statusCode = 200;
        res.send(
            {
                message: "OK",
                list: result
            }
        );
    });
}


exports.addConscript = async (req, res, data) => {
    db.connection.query('SELECT `id` from `call` WHERE `part_number`="' + data.part_number + '" AND `type_of_army`="' + data.type_of_army + '" AND `year_of_call`="' + data.year_of_call + '"', function (err, result) {
        console.log(err)
        console.log(result)
        if (result.length === 0) {
            db.connection.query('INSERT INTO `call`(`part_number`, `type_of_army`, `year_of_call`) VALUES ("' + data.part_number + '", "' + data.type_of_army + '", "' + data.year_of_call + '")');
            console.log(err)
            db.connection.query('SELECT * FROM `call` WHERE `part_number`="' + data.part_number + '" AND `type_of_army`="' + data.type_of_army + '" AND `year_of_call`="' + data.year_of_call + '"', function (err, result) {
                console.log(err)
                console.log(result)
                let call_id = result[0].id
                db.connection.query('SELECT * FROM `passport` WHERE `series`="' + data.series + '" AND `number`="' + data.number + '"', function (err, result) {
                    console.log(err)
                    console.log(result)
                    if (result.length === 0) {
                        db.connection.query('INSERT INTO `passport`(`series`, `number`, `issued`) VALUES ("' + data.series + '", "' + data.number + '", "' + data.issued + '")', function (err, result) {
                            db.connection.query('SELECT * FROM `passport` WHERE `series`="' + data.series + '" AND `number`="' + data.number + '"', function (err, result) {
                                let passport_id = result[0].id
                                db.connection.query('INSERT INTO `conscript`(`secondName`, `firstName`, `lastName`, `birth`, `registration`, `institution`, `jobPlace`, `passport_id`, `call_id`, `worker_id`) VALUES ("' + data.secondName + '", "' + data.firstName + '", "' + data.lastName + '", "' + data.birth + '", "' + data.registration + '", "' + data.institution + '", "' + data.jobPlace + '", "' + passport_id + '", "' + call_id + '", "' + data.worker_id + '")', function (err, result) {
                                    console.log(err)
                                    if (err) {
                                        res.statusCode = 400;
                                        res.send(
                                            {
                                                message: "ERROR"
                                            }
                                        );
                                    } else {
                                        res.statusCode = 200;
                                        res.send(
                                            {
                                                message: "ADDED"
                                            }
                                        );
                                    }
                                })
                            })
                        });
                    } else {
                        let passport_id = result[0].id
                        db.connection.query('INSERT INTO `conscript`(`secondName`, `firstName`, `lastName`, `birth`, `registration`, `institution`, `jobPlace`, `passport_id`, `call_id`, `worker_id`) VALUES ("' + data.secondName + '", "' + data.firstName + '", "' + data.lastName + '", "' + data.birth + '", "' + data.registration + '", "' + data.institution + '", "' + data.jobPlace + '", "' + passport_id + '", "' + call_id + '", "' + data.worker_id + '")', function (err, result) {
                            console.log(err)
                            if (err) {
                                res.statusCode = 400;
                                res.send(
                                    {
                                        message: "ERROR"
                                    }
                                );
                            } else {
                                res.statusCode = 200;
                                res.send(
                                    {
                                        message: "ADDED"
                                    }
                                );
                            }
                        })
                    }
                })
            })
        } else {
            let call_id = result[0].id
            db.connection.query('SELECT * FROM `passport` WHERE `series`="' + data.series + '" AND `number`="' + data.number + '"', function (err, result) {
                console.log(err)
                console.log(result)
                if (result.length === 0) {
                    db.connection.query('INSERT INTO `passport`(`series`, `number`, `issued`) VALUES ("' + data.series + '", "' + data.number + '", "' + data.issued + '")', function (err, result) {
                        db.connection.query('SELECT * FROM `passport` WHERE `series`="' + data.series + '" AND `number`="' + data.number + '"', function (err, result) {
                            let passport_id = result[0].id
                            db.connection.query('INSERT INTO `conscript`(`secondName`, `firstName`, `lastName`, `birth`, `registration`, `institution`, `jobPlace`, `passport_id`, `call_id`, `worker_id`) VALUES ("' + data.secondName + '", "' + data.firstName + '", "' + data.lastName + '", "' + data.birth + '", "' + data.registration + '", "' + data.institution + '", "' + data.jobPlace + '", "' + passport_id + '", "' + call_id + '", "' + data.worker_id + '")', function (err, result) {
                                console.log(err)
                                if (err) {
                                    res.statusCode = 400;
                                    res.send(
                                        {
                                            message: "ERROR"
                                        }
                                    );
                                } else {
                                    res.statusCode = 200;
                                    res.send(
                                        {
                                            message: "ADDED"
                                        }
                                    );
                                }
                            })
                        })
                    });
                } else {
                    let passport_id = result[0].id
                    db.connection.query('INSERT INTO `conscript`(`secondName`, `firstName`, `lastName`, `birth`, `registration`, `institution`, `jobPlace`, `passport_id`, `call_id`, `worker_id`) VALUES ("' + data.secondName + '", "' + data.firstName + '", "' + data.lastName + '", "' + data.birth + '", "' + data.registration + '", "' + data.institution + '", "' + data.jobPlace + '", "' + passport_id + '", "' + call_id + '", "' + data.worker_id + '")', function (err, result) {
                        console.log(err)
                        if (err) {
                            res.statusCode = 400;
                            res.send(
                                {
                                    message: "ERROR"
                                }
                            );
                        } else {
                            res.statusCode = 200;
                            res.send(
                                {
                                    message: "ADDED"
                                }
                            );
                        }
                    })
                }
            })
        }
    })
}


exports.deleteConscript = (req, res, data) => {
    db.connection.query('DELETE FROM `conscript` WHERE `id`="' + data.id + '"', function(err, result) {
        console.log(err)
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
                    message: "CONSCRIPT NOT FOUND"
                }
            );
        }
    });
}

exports.updateConscript = (req, res, data) => {
    db.connection.query('UPDATE `conscript` SET `secondName`="' + data.secondName + '",`firstName`="' + data.firstName + '",`lastName`="' + data.lastName + '",`birth`="' + data.birth + '",`registration`="' + data.registration + '",`institution`="' + data.institution + '",`jobPlace`="' + data.jobPlace + '" WHERE id="' + data.id + '" AND `id` IS NOT NULL', function(err, result) {
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
                    message: "CONSCRIPT NOT FOUND"
                }
            );
        }
    });
}