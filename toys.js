const express = require("express");
var router = express.Router();

var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://CuongNguyen121:ncuong1212@newcluster.rskui.mongodb.net/test";

router.get("/insert", async (req, res) => {
  res.render("insert");
});

router.post("/doInsert", async (req, res) => {
  let inputID = req.body.txtID;
  let inputName = req.body.txtName;
  let inputPrice = req.body.txtPrice;
  let inputProducer = req.body.txtProducer;
  let newProduct = {
    id: inputID,
    name: inputName,
    price: inputPrice,
    producer: inputProducer,
  };

  let client = await MongoClient.connect(url);
  let dbo = client.db("ToysDB");
  await dbo.collection("Product").insertOne(newProduct);
  res.redirect("/");
});

router.get("/", async (req, res) => {
  let client = await MongoClient.connect(url);
  let dbo = client.db("ToysDB");
  let result = await dbo.collection("Product").find({}).toArray();
  res.render("index", { model: result });
});
module.exports = router;
