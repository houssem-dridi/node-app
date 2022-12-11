const mongoose = require("mongoose");
const demandeSchema = mongoose.Schema({
  matricule: String,
  type: String,
  status: String,
  startDate: String,
  endDate: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const demande = mongoose.model("Demande", demandeSchema);
module.exports = demande;
