const Auth            = require('./models/auth');
const Conscript       = require('./models/conscript');
const Commission      = require('./models/commission');
const express         = require('express');
const path            = require('path');
const favicon         = require('serve-favicon');
const bodyParser      = require('body-parser');
const urlencodedParser= bodyParser.urlencoded({extended: false});
const methodOverride  = require('method-override');
const useragent       = require('express-useragent');
const cors            = require('cors');
const app             = express();

app.use(bodyParser());
app.use(methodOverride());
app.use(useragent.express());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Content-Disposition");
    next();
});

console.log("smt")
//////////////////////////////////////////////////////////////////

// Авторизация
app.post("/auth", urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    Auth.authUser(req, res, req.body)
});

//////////////////////////////////////////////////////////////////

// Изменить работника
app.put("/commission", urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    Commission.updateCommission(req, res, req.body)
});

// Удалить работника
app.delete("/commission", urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    Commission.deleteCommission(req, res, req.body)
});

// Добавление работника комиссии
app.post("/commission", urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    Commission.addCommission(req, res, req.body)
});

// Получить работников комиссии
app.get("/commission", urlencodedParser, (req, res) => {
    Commission.getCommissions(req, res)
});

//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////

// Изменить призывника
app.put("/conscript", urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    Conscript.updateConscript(req, res, req.body)
});

// Удалить призывника
app.delete("/conscript", urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    Conscript.deleteConscript(req, res, req.body)
});

// Получить призывника по писку
app.post("/conscriptbysearch", urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    Conscript.getConscriptsBySearch(req, res, req.body)
});

// Получить призывника по id
app.post("/conscriptbyid", urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    Conscript.getConscriptsById(req, res, req.body)
});

// Добавление призывника
app.post("/conscript", urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    Conscript.addConscript(req, res, req.body)
});

// Получить призывников
app.get("/conscript", urlencodedParser, (req, res) => {
    Conscript.getConscripts(req, res)
});

//////////////////////////////////////////////////////////////////

app.get('*', (req,res) => {
    res.send(res);
});

app.use(function(err, req, res, next) {
    res.json(err);
});

app.listen(8000, function(){
    console.log('Express server listening on port 8000');
});

