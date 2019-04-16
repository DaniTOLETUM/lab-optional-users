const express = require("express");
const app = express();
const hbs = require("hbs");
const parser = require("body-parser");
const mongoose = require('mongoose');
const axios = require("axios");
const Users = require('./models/Users'); // Import of the model User from './models/Users'
app.use(parser.urlencoded({
  extended: false
}));

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

app.post("/user", (req, res) => {
  var user = new Users(req.body);
  console.log(user);
  Users.create(user).then(userData => {
    console.log("my user is in data base", userData);
  }).catch(err => {
    console.log(err, " Error");
  })
})



// TO CREATE A NEW USER IN DB //
// app.get("/home.hbs", (req, res) => {
//   const data = {
//     scripts: ["form_product.js", "list_products.js"]
//   };
//   res.Users.Create({
// }).then(usersData => {
//   console.log("The new user is in data base", usersData);
// }).catch(err => {
//   console.log(err, " Error");
// })



app.listen(3100, () => {
  console.log("my app started @ http://localhost:3100")
});