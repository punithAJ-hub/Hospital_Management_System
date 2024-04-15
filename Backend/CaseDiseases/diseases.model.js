const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
  Disease: {
    type: String,
  },
  County: {
    type: String,
  },
  Year: {
    type: Number,
  },
  Sex: {
    type: String,
  },
  Count: {
    type: Number,
  },
  Population: {
    type: Number,
  },
  Rate: {
    type: Number,
  },
  CiLower: {
    type: Number,
  },
  CiUpper: {
    type: Number,
  },
  Unstable: {
    type: String,
  },
});

const Disease = mongoose.model("casesbydiseases", diseaseSchema);

module.exports = Disease;
