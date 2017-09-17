var express = require('express');
var passport = require('passport');
var Account = require("../models/account");
var PwEntry = require("../models/pwentry");

var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('index', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/db');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
        res.status(200).send("pong!");
});



router.get('/add', function(req, res){
    res.render('add', {user:req.user});
})

router.get('/db', function(req, res){
    PwEntry.find(function(err,service){
        if (err) return console.error(err);
        console.log(service);
        res.render('db', {service : service, user:req.user});
    })

})

router.post('/add', function(req, res){
    pw = new PwEntry({ service : req.body.service , username : req.body.username, password : req.body.password, notes : req.body.notes});
    console.log(pw);
    pw.save();
    
    PwEntry.find(function(err,service){
        if (err) return console.error(err);
        console.log(service);
        res.render('db', {service : service, user:req.user});
    })
})



module.exports = router;

