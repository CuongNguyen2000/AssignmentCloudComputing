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

var phoneManager = require("./smartPhone.js");
app.use("/", phoneManager);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running in 5000 port");
});
