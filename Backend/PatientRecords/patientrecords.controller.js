const util = require("../util");
const PatientRecord = require("./patientrecords.model");
const { default: axios } = require("axios");

const createPatientRecord = async (req, res) => {
  const body = req.body;
  const bedId = body.assigned_bed;

  try {
    const {
      medicalConditions,
      medications,
      primaryCarePhysician,
      lastVisitDate,
    } = body;

    const records = [
      {
        medicalConditions: medicalConditions,
        medications: medications,
        primaryCarePhysician: primaryCarePhysician,
        lastVisitDate: lastVisitDate,
        assigned_bed: body.assigned_bed,
      },
    ];

    console.log("Records : ", records);

    const patientRecordDoc = new PatientRecord({ ...body, records });

    const user = await patientRecordDoc.save();

    if (bedId) {
      const bedRes = await axios.put(
        `http://localhost:3000/beds/assign/${bedId}`
      );
      console.log("Bed updated:", bedRes.data);
    }

    return res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

const updatePatientRecord = async (req, res) => {
  const body = req.body;
  const bedId = body.assigned_bed;

  try {
    const newRecord = {
      medicalConditions: body.medicalConditions,
      medications: body.medications,
      primaryCarePhysician: body.primaryCarePhysician,
      lastVisitDate: body.lastVisitDate,
      assigned_bed: body.assigned_bed,
      dischargedOn: body.dischargedOn,
    };

    const user = await PatientRecord.findOneAndUpdate(
      { email: body.email },
      { $push: { records: newRecord } },
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
    const patientRecords = await PatientRecord.find({});
    console.log("User obj : ", patientRecords);

    if (!patientRecords) {
      return res.status(404).json({ error: "Patient Records not found" });
    }
    return res.status(200).json({ patientRecords: patientRecords });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPatientRecord,
  getAllPatients,
  updatePatientRecord,
};
