// import express module
const express = require("express");
// import body-parser module
const bodyParser = require("body-parser");
// import mongoose module
const mongoose = require("mongoose");

// connexion à la base de donnée
mongoose.connect("mongodb://localhost:27017/houssem-node");

const demandesRoutes = require("./routes/demandes-routes");

// import User Model
const User = require("./models/user");

// creates express application
const app = express();

// Configure Body Parser
// Send response with JSON Format
app.use(bodyParser.json());
// Parse object attributes from Request
app.use(bodyParser.urlencoded({ extended: true }));


// Security Configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

// Business Logic: Add User (signup)
app.post("/users/signup", (req, res) => {
  console.log("here add user", req.body);
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    pwd: req.body.pwd,
    role: req.body.role,
  });
  user.save((err, doc) => {
    if (err) {
      res.json({ message: "Error" });
    } else {
      res.json({ message: "User Added with success" });
    }
  });
});

// Business Logic: Login User
app.post("/users/login", (req, res) => {
  console.log("Here user", req.body);
  User.findOne({ email: req.body.email, pwd: req.body.pwd }).then((doc) => {
    if (!doc) {
      res.json({ message: "0" });
    } else {
      let user = {
        id: doc._id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        role: doc.role,
      };
      res.json({ user: user, message: "Succès de connexion" });
    }
  });
});

// Business Logic : Get All users
app.get("/users", (req, res) => {
  User.find().then((docs) => {
    res.json({ users: docs });
  });
});

// Business Logic : Supprimer user
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  User.deleteOne({ _id: id }).then((result) => {
    res.json({ message: "User supprimé avec succès" });
  });
});

// Business Logic : Modifier user
app.put("/users", (req, res) => {
  User.updateOne({ _id: req.body._id }, req.body).then((result) => {
    res.json({ message: "User modifié avec succès" });
  });
});

// Business Logic : Récupérer un user par ID
app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  User.findOne({ _id: id }).then((doc) => {
    res.json({ user: doc });
  });
});

// Every Req (path starts by "/demandes") will be dispatched to matchesRoutes
app.use("/demandes", demandesRoutes);

// App is importable from another files
module.exports = app;
