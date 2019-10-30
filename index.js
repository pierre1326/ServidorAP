//Librerias

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Global variables
models = require('./constants/schemas')(mongoose);
values = require('./constants/values');

//Configuration
app.use(bodyParser.json());
app.use (bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

//Database
mongoose.connect(values['mongoUri'], {useNewUrlParser : true}, (err) => {
  if(err) {
    console.log(err);
  }
  else {
    console.log('Connection successfull');
  }
});

//Routes
require('./routes/routes.js')(app, mongoose);

//Init server
app.listen(values.port, function() {
  console.log("Serving Biomasa on port: " + values.port);
});
