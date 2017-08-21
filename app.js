const express = require('express');
const mustache = require('mustache-express');
const users = require('./users.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
// Amy also had this one:
//const parseurl = require('parseurl');


// setup view engine
app.engine('mustache', mustache());
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

// function match(user){
//   return user.username === username;
// }

function authenticate(req,username,password){
  user = users.users.find(function(x){
    return x.username === username;
  });
  if (user.password === password) {
    console.log ("yay! password is right!")
  }
  else {
    console.log ("nope, password is wrong.")
  }
    // console.log("Is this the right user?: "+user.username);
};




 // for (var i = 0; i < users.users.length; i++) {
 //   if (users.users[i].username === username && users.users[i].password === password) {
 //     console.log("AUTHENTICATED!!");
 //   }
 //   else {
 //     console.log("None of them matched!");
 //   }
 // }
// }
// GET/POST

app.get('/',function(req,res){
 //res.send("Hello world!");
 res.render('index')
});

app.post('/', function(req, res){
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  console.log(password);
  authenticate(req,username,password);
  // console.log(users);
  // console.log(users.users[0]);
});


app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
});

// call login function in admin.js in POST

// app.get('/', function(req, res){
//   // Set 'action' to '/'
//   var html = '<form action="/" method="post">' +
//              '<h1>User Name</h1>' +
//              '<p>Enter your email</p>' +
//              '<input type="text" name="email" placeholder="email address" />' +
//              '<button type="submit">Submit</button>' +
//          '</form>';
//   res.send(html);
// });
//
// // Receives data from form (action='/')
// // 'req.body' now contains form data.
// app.post('/', function(req, res){
//   console.log(req.body);
//   var email = req.body.email;
//   var html = '<p>Your user name is: </p>' + email;
//   res.send(html);
// });
