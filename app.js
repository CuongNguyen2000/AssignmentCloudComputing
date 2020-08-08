const express = require("express");
const engines = require("consolidate");
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var publicDir = require("path").join(__dirname, "/public");
app.use(express.static(publicDir));

// npm i handlebars consolidate --save
app.engine("hbs", engines.handlebars);
app.set("views", "./views");
app.set("view engine", "hbs");

var toysManager = require("./manageToys.js");
app.use("/", toysManager);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running in 3000 port");
});
