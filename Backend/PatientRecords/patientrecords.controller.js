const util = require("../util");
const PatientRecord = require("./patientrecords.model");
const bedController = require("../Beds/beds.controller");
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
    // update bed info
    const bedRes = await axios.put(
      `http://localhost:3000/beds/assign/${bedId}`
    );

    console.log("Bed updated:", bedRes.data);

    return res.status(200).json({ message: "Data added Sucessfully" });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

const updateUser = async (req, res) => {
  const { params, body } = req;
  const id = params.id;

  try {
    const user = await User.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    if (user) {
      console.log(user);
      res.json(user);
    } else {
      res.status(404).json({ error: `No Professor found by id: ${id}` });
    }
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      res.status(400).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: error.toString() });
    }
  }
};

const getUserWithDetails = async (req, res) => {
  try {
    // Extract email and password from the request body
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);

    // Find a user with the provided email
    const user = await User.findOne({ email });
    console.log("User obj : ", user);

    // If no user is found with the provided email
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // If user is found, check if the provided password matches the user's password
    else if (user.password === password) {
      // Password matches, return a success response
      return res.status(200).json({ message: "Login successful" });
    } else {
      // Password doesn't match, return an unauthorized response
      return res.status(401).json({ error: "Email/Password is incorrect" });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPatientRecord,
};
