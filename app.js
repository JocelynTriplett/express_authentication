const express = require('express');
const mustache = require('mustache-express');
const users = require('./users.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// setup view engine
app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// from express-session documentation:
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

function authenticate(req,username,password){
  if (user = users.users.find(function(x){
    return x.username === username;
  })) {
  if (user.password === password) {
    console.log ("yay! password is right!");
    function randomNumber(min, max) {
      let random =  Math.random() * (max - min) + min;
      req.session.cookie.id = random;
    }
    randomNumber(1, 101);
  }
  else {
    console.log ("nope, password is wrong.")
  }}
  else {
    console.log("sorry, username not found.")
  }
};

app.get('/',function(req,res){
  res.render('index')
});

app.post('/', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  authenticate(req,username,password);
  if (req.session.cookie.id) {
    res.render('yay', {username})
  }
  else {
    res.render('uhoh');
  }
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
});
