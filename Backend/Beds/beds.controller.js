const util = require("../util");
const Bed = require("./beds.model");

const createBed = async (req, res) => {
  const body = req.body;
  console.log(body);

  try {
    const bedDoc = new Bed(body);
    console.log("Recieved in createUser");
    console.log(bedDoc);
    const bed = await bedDoc.save();
    return res.status(200).json({ message: "Bed added Sucessfully" });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

const updateBed = async (req, res) => {
  const id = req.params.bedId;
  try {
    const bed = await Bed.updateOne({ bed_id: id }, { occupied: true });

    if (bed) {
      console.log(bed);
      return res.json(bed);
    } else {
      return res.status(404).json({ error: `No bed found by id: ${id}` });
    }
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

const getBedById = async (req, res) => {
  try {
    // Extract email and password from the request body
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);

    // Find a user with the provided email
    const bed = await Bed.findOne({ email });
    console.log("User obj : ", user);

    // If no user is found with the provided email
    if (!bed) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(401).json({ error: "Email/Password is incorrect" });
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json({ error: error.message });
  }
};

const getVacantBeds = async (req, res) => {
  try {
    const beds = await Bed.find({ occupied: false }, { _id: 0, occupied: 0 });
    return res.status(201).json({ beds: beds });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};
module.exports = {
  createBed,
  updateBed,
  getBedById,
  getVacantBeds,
};
