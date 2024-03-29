const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    bloodType: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    emergencyContactName: { type: String, required: true },
    emergencyContactNumber: { type: String, required: true },
    medicalConditions: { type: String, required: true },
    allergies: { type: String, required: true },
    medications: { type: String, required: true },
    insuranceProvider: { type: String, required: true },
    insuranceNumber: { type: String, required: true },
    primaryCarePhysician: { type: String, required: true },
    lastVisitDate: { type: Date, required: true },
    assigned_bed: { type: String },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Patient = mongoose.model("PatientRecord", patientSchema);

module.exports = Patient;
