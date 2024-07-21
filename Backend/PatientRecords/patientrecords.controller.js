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

    // console.log("Records : ", records);

    const patientRecordDoc = new PatientRecord({ ...body, records });

    const user = await patientRecordDoc.save();

    if (bedId) {
      const bedRes = await axios.put(
        `http://localhost:3000/beds/assign/${bedId}`
      );
      // console.log("Bed updated:", bedRes.data);
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

      // console.log("Bed updated:", bedRes.data);
    }

    return res.status(200).json({ message: "Data updated successfully", user });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patientRecords = await PatientRecord.find({});
    // console.log("User obj : ", patientRecords);

    if (!patientRecords) {
      return res.status(404).json({ error: "Patient Records not found" });
    }
    return res.status(200).json({ patientRecords: patientRecords });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deletePatientRecord = async (req, res) => {
  const month = req.params.month;
  const day = req.params.day;

  const year = req.params.year;

  const lastVisitDate = month + "/" + day + "/" + year;
  console.log("visit date ", lastVisitDate);

  try {
    const patientsToDelete = await Patient.find({
      "records.lastVisitDate": lastVisitDate,
    });
    const deletionResult = await Patient.deleteMany({
      "records.lastVisitDate": lastVisitDate,
    });

    console.log(`${deletionResult.deletedCount} patient(s) deleted.`);

    return res.status(200).json({ message: "Deleted the record" });
  } catch (error) {
    return res.status(500).json({ message: "Unable Deleted the record" });
  }
};

var mapFunction = function () {
  this.records.forEach(function (record) {
    var monthYear =
      record.lastVisitDate.split("/")[0] +
      "/" +
      record.lastVisitDate.split("/")[2];
    emit(monthYear, { admissions: 1, discharged: 0 });
  });
};

var reduceFunction = function (key, values) {
  var admissions = 0;
  var discharged = 0;

  values.forEach(function (value) {
    admissions += value.admissions;
    discharged += value.discharged;
  });

  return { admissions: admissions, discharged: discharged };
};

var finalizeFunction = function (key, reducedValue) {
  return reducedValue;
};

db.collection.mapReduce(mapFunction, reduceFunction, {
  out: { inline: 1 },
  finalize: finalizeFunction,
});

module.exports = {
  createPatientRecord,
  getAllPatients,
  updatePatientRecord,
  deletePatientRecord,
};
