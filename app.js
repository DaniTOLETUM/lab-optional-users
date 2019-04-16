const express = require("express");
const app = express();
const hbs = require("hbs");
const parser = require("body-parser");

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