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
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "/public"));


// render the pages
app.get("/", (req, res) => {
  res.render("home.hbs");
});

app.get("/dashboard", (request, response) => {
  response.render(`${__dirname}/views/dashboard.hbs`);
});

app.get("/create-user", (request, response) => {
  response.render(`${__dirname}/views/create-user.hbs`);
});

// app.get("/list-user", (request, response) => {
//   response.render(`${__dirname}/views/list-user.hbs`);
// });



// Post (create) new user to dataBase from the form
app.post("/user", (req, res) => {
  var user = new Users(req.body);
  console.log(user);
  Users.create(user).then(userData => {
    console.log("my user is in data base", userData);
  }).catch(err => {
    console.log(err, " Error");
  })
})

// Get all users from DB
// app.get('/list-users', function (req, res) {
//   users.find({}, function (err, users) {
//     res.render("list-users.hbs", {
//       users: users
//     });
//   });
// });

app.get("/list-user", (req, res) => {
  Users.find({}) //look for in DB. Aqui hay que poner un método para obtener los datos desde la BD. Users es como hemos llamado el modelo, pero la colección en la BD también se llama "users"
    .then(dataUser => { //dataUser es solo el nombre que asignamos a los datos
      // res.json(dataUser) //para comprobar si recibimos los datos 
      console.log("The received data from the DB: ", dataUser);
      res.render("list-user.hbs", { //En la respuesta, pasamos el archivo hbs donde queremos que se carguen los datos así como los datos. Es lo que queremos que haga. En este caso "mostrar la página list-user.hbs y pasamos los dataUser para que se muestren en ella". Ahora en la página list-user.hbs tenemos que especificar con html y moustache, qué datos queremos mostrar.
        dataUser
      });
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE DB'
    })
    .catch(err => { // en caso de no mostrar los datos por algún error, mostrar el error.
      console.log("The error while searching users occurred: ", err);
    })
});




app.listen(3100, () => {
  console.log("my app started @ http://localhost:3100")
});