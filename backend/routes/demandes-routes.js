// import express module
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const demande = require("../models/demande");
// import Match Model
const Demande = require("../models/demande");
const User = require("../models/user");




router.get("/", (req, res) => {
  Demande.find().populate('user').then((demandes) => {
    console.log(demandes);
    res.json({ demandes: demandes, message: "Success" });
  });
});

// Business Logic : Ajouter une demande
router.post("/", (req, res) => {
  console.log("here demande", req.body);
  let demande = new Demande({
    matricule: req.body.matricule,
    type: req.body.type,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    status: "En attente",
    user: ObjectId(req.body.userId)
  });
  console.log(demande);

  demande.save((err, doc) => {
    if (err) {
      res.json({ message: "Error" });
    } else {
      res.json({ message: "Demande ajoutée avec succès" });
    }
  });
});
// Business Logic : Supprimer une demande
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  Demande.deleteOne({ _id: id }).then((result) => {
    res.json({ message: "Demande supprimée avec succès" });
  });
});

// Business Logic : Récupérer une demande par ID
router.get("/:id", (req, res) => {
  let id = req.params.id;
  Demande.findOne({ _id: id }).then((doc) => {
    res.json({ demande: doc });
  });
});

// Business Logic: Modifier une demande par ID
router.put("/", (req, res) => {
  Demande.updateOne({ _id: req.body._id }, req.body).then((updateResponse) => {
    res.json({ message: "Success" });
  });
});

// Business Logic: Confirmer une demande
router.put("/confirm", (req, res) => {
  Demande.updateOne({ _id: req.body.id }, { status: "Confirmée" }).then(
    (updateResponse) => {
      res.json({ message: "Confirmée" });
    }
  );
});

// Business Logic: Annuler une demande
router.put("/cancel", (req, res) => {
  Demande.updateOne({ _id: req.body.id }, { status: "Annulée" }).then(
    (updateResponse) => {
      res.json({ message: "Annulée" });
    }
  );
});
// get toutes mes demandes by user id
router.get("/user/:id", (req, res) => {
  Demande.find({ user: req.params.id }).populate('user').then(mesdemandes => {
    console.log(mesdemandes);
    res.json({ mesdemandes: mesdemandes, message: "Success" });
  });
})
// Make router exportable
module.exports = router;
