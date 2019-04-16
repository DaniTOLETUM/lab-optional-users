const express = require("express");
const app = express();
const hbs = require("hbs");
const parser = require("body-parser");
const mongoose = require('mongoose');
const Users = require('./models/Users'); // Import of the model User from './models/Users'

mongoose.connect('mongodb://localhost/usersAPP', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to usersAPP from Mongo!');
  }).catch(err => {
    console.error('Error connecting to usersAPP from mongo', err);
  });

app.use(parser.json());
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.set("view engine", hbs);


app.get("/", (req, res) => {
  res.render("home.hbs");
});




app.listen(3100, () => {
  console.log("my app started @ http://localhost:3100")
});