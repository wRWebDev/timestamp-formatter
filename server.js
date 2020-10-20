require('dotenv').config({path: __dirname + '/.env'});
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static(__dirname + '/public'))

//Homepage
app.get(
    '/',
    (req, res)=>{
        res.sendFile( __dirname + '/views/index.html' )
    }
)

app.get(
    '/api/timestamp',
    (req, res)=>{
        req.date = Date.now();
        res.json({
            "unix": req.date,
            "utc": new Date(req.date).toUTCString()
        })
    }
)

app.get(
    '/api/timestamp/:dateString',
    (req, res, next)=>{
        //console.log("req.params: "+req.params.dateString)

        (/[\d]{13,}/).test(req.params.dateString)
            ? req.date = parseInt(req.params.dateString)
            : new Date(req.params.dateString).getTime() > 0
                ? req.date = new Date(req.params.dateString).getTime()
                : req.error = "Invalid date"

        //console.log("req.date " + req.date)
        next()
    }, (req, res)=>{
        req.error === "Invalid date"
            ? res.json({"error": "Invalid Date"})
            : res.json({
                "unix": req.date, 
                "utc": new Date(req.date).toUTCString()
            })
    }
    
)

var listener = app.listen(process.env.PORT || 3000, ()=>{
    console.log('Timestamp formatter is listening on port ' + listener.address().port);
});