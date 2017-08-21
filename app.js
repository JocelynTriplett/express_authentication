const express = require('express');
const mustache = require('mustache-express');
const users = require('./users.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
// Amy also had this one:
//const parseurl = require('parseurl');


// setup view engine
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
//app.use('/', adminRouter);
// app.use('/admin', adminRouter);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// from express-session documentation:
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.get('/',function(req,res){
 //res.send("Hello world!");
 res.render('index')
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
});

// call login function in admin.js in POST
