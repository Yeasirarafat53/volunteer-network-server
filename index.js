const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var MongoClient = require("mongodb").MongoClient;

var uri =
  "mongodb://volunteer:12345678a@cluster0-shard-00-00.fkijv.mongodb.net:27017,cluster0-shard-00-01.fkijv.mongodb.net:27017,cluster0-shard-00-02.fkijv.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-7hlah8-shard-0&authSource=admin&retryWrites=true&w=majority";

// var serviceAccount = require("./configs/burj-al-arab-6e064-firebase-adminsdk-ew3o1-fb170feafc.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

MongoClient.connect(uri, function (err, client) {
  let collection = client.db("volunteerNetwork").collection("products");

  // perform actions on the collection object

  // fakdedata guloke database a pathano hoicee........
  app.post("/addProduct", (req, res) => {
    const collection = client.db("volunteerNetwork").collection("products");
    const product = req.body;
    console.log(product);
    collection.insertMany(product).then((result) => {
      console.log(result);
      res.send(result);
    });
  });

  //    database a selected product gulo load kora hoice...............

  app.post("/createProduct", (req, res) => {
    const products = client.db("volunteerNetwork").collection("createProduct");
    console.log(req.body);
    const createProduct = req.body;
    products
      .insertOne(createProduct)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  // fakedata gulo database a load kora hoice.........

  app.get("/products", (req, res) => {
    collection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  //    app.get("/tasklist", (req, res) => {
  //     const products = client.db("volunteerNetwork").collection("createProduct");
  //     const bearer = req.headers.authorization;
  //     if (bearer && bearer.startsWith("Bearer")) {
  //       const idToken = bearer.split(' ')[1];
  //       // console.log({idToken});

  //       admin
  //         .auth()
  //         .verifyIdToken(idToken)
  //         .then((decodedToken) => {
  //           const tokenEmail = decodedToken.email;
  //           const queryEmail = req.query.email;
  //         //   console.log(tokenEmail, queryEmail);
  //           if(tokenEmail==queryEmail) {
  //             products.find({email: queryEmail})
  //               .toArray((err, documents)=>{
  //                 res.status(200).send(documents)
  //               })

  //           }
  //         })
  //         .catch((error) => {
  //           res.status(401).send('un-authorised access')
  //         });
  //     }

  //     else{
  //       res.status(401).send('un-authorised access')
  //     }

  //   });

  app.get("/task", (req, res) => {
    const products = client.db("volunteerNetwork").collection("createProduct");
    products.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.delete("/taskdelete/:id", (req, res) => {
    const product = client.db("volunteerNetwork").collection("createProduct");
    console.log(req.params.id);
    product.deleteOne({ _id: ObjectId(req.params.id) }).then((result) => {
      res.send(result);
    });
  });

  console.log("database connetced");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port);
