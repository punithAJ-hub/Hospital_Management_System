const util = require("../util");
const PatientRecord = require("./patientrecords.model");
const { default: axios } = require("axios");

const createPatientRecord = async (req, res) => {
  const body = req.body;
  const bedId = body.assigned_bed;
  console.log(body);

  try {
    const patientrecordDoc = new PatientRecord(body);
    console.log("Recieved in createUser");
    console.log(patientrecordDoc);
    const user = await patientrecordDoc.save();
    console.log(user);
    // update bed info if exists
    if (bedId) {
      const bedRes = await axios.put(
        `http://localhost:3000/beds/assign/${bedId}`
      );

      console.log("Bed updated:", bedRes.data);
    }

    return res.status(200).json({ message: "Data added Sucessfully" });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

const updatePatientRecord = async (req, res) => {
  const body = req.body;
  const bedId = body.assigned_bed;
  console.log(body);

  try {
    const user = await PatientRecord.findOneAndUpdate(
      { email: body.email },
      body,
      { new: true }
    );
    if (bedId) {
      const bedRes = await axios.put(
        `http://localhost:3000/beds/assign/${bedId}`
      );

      console.log("Bed updated:", bedRes.data);
    }

    return res.status(200).json({ message: "Data updated successfully", user });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

const getAllPatients = async (req, res) => {
  try {
    // Find a user with the provided email
    const patientRecords = await PatientRecord.find({});
    console.log("User obj : ", patientRecords);

    // If no user is found with the provided email
    if (!patientRecords) {
      return res.status(404).json({ error: "Patient Records not found" });
    }
    return res.status(200).json({ patientRecords: patientRecords });
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPatientRecord,
  getAllPatients,
  updatePatientRecord,
};
