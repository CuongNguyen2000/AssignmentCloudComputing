const express = require("express");
var router = express.Router();

var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://CuongNguyen121:ncuong1212@newcluster.rskui.mongodb.net/test";

router.get("/", async (req, res) => {
  let client = await MongoClient.connect(url);
  let dbo = client.db("ToysDB");
  let result = await dbo.collection("Product").find({}).toArray();
  res.render("index", { model: result });
});

router.get("/insert", (req, res) => {
  res.render("insertToys");
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

  if (isNaN(inputPrice)) {
    let errorModel = { errorMsg: "The price must be a number !!!" };
    res.render("insertToys", { model: errorModel });
  } else {
    await dbo.collection("Product").insertOne(newProduct);
    res.redirect("/");
  }
});

router.get("/doSearch", async (req, res) => {
  var name_search = req.query.txtSearch;
  let client = await MongoClient.connect(url);
  let dbo = client.db("ToysDB");
  //let search = /name_search$/;
  let result = await dbo
    .collection("Product")
    .find({
      $or: [
        { name: new RegExp(name_search, "i") },
        { producer: new RegExp(name_search, "i") },
      ],
    })
    .toArray();
  res.render("index", { model: result });
});

router.get("/remove", async (req, res) => {
  let id = req.query.id;
  let client = await MongoClient.connect(url);
  var ObjectID = require("mongodb").ObjectID;
  let dbo = client.db("ToysDB");
  await dbo.collection("Product").deleteOne({ _id: ObjectID(id) });
  res.redirect("/");
});

router.get("/update", async (req, res) => {
  let id = req.query.id;
  var ObjectID = require("mongodb").ObjectID;
  let client = await MongoClient.connect(url);
  let dbo = client.db("ToysDB");
  let result = await dbo.collection("Product").findOne({ _id: ObjectID(id) });
  res.render("updateToy", { Product: result });
});

router.post("/doUpdate", async (req, res) => {
  let id = req.body.id;
  let inputID = req.body.txtID;
  let inputName = req.body.txtName;
  let inputPrice = req.body.txtPrice;
  let inputProducer = req.body.txtProducer;
  let newValues = {
    $set: {
      id: inputID,
      name: inputName,
      price: inputPrice,
      producer: inputProducer,
    },
  };
  var ObjectID = require("mongodb").ObjectID;
  let condition = { _id: ObjectID(id) };

  let client = await MongoClient.connect(url);
  let dbo = client.db("ToysDB");
  await dbo.collection("Product").updateOne(condition, newValues);

  res.redirect("/");
});

module.exports = router;
