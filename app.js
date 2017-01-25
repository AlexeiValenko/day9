/**
 * Created by py on 1/25/17.
 */
var express = require('express');
var app = express();
var cashe = [];

/* serves main page */

app.use('/', express.static(_dirname));
// app.use('/static',express.static(path.join(_dirname,'static')); dir/static


app.get('/', function(req, res) {
    res.sendfile('index.html');

});

app.use('/form', function(req, res, next){
 //   console.log("Debugg here");
    return next();

});

app.get('/form', function(req, res){

    cashe.push(req.query);

    if(!checkCashe()) {
        res.status(500).send('<h1>Please fill all fields</h1>');
    } else {
        res.status(200).send(cashe[cashe.length - 1].name + ' from ' + cashe[cashe.length - 1].country + ' hello!');
    }

});


app.listen('8080', function() {
});


function checkCashe() {
    if(cashe.length == 0 ) {
        console.log("No cashe");
        return;
    }

    var badInput = false;

    if(cashe[cashe.length - 1].name == '') badInput = true;
    if(cashe[cashe.length - 1].password == '') badInput = true;
    if(cashe[cashe.length - 1].country == '') badInput = true;
    if(cashe[cashe.length - 1].country == 'Select your country') badInput = true;
    if(cashe[cashe.length - 1].gender == '') badInput = true;


    if(badInput) console.log("Bad Input");

    return !badInput;

}