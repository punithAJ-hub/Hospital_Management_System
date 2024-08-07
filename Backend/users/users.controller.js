const util = require("../util");
const User = require("./users.model");

const createUser = async (req, res) => {
  const body = req.body;
  console.log(body);

  try {
    const userDoc = new User(body);
    // console.log("Recieved in createUser");
    // console.log(userDoc);
    const user = await userDoc.save();
    return res.status(200).json({ message: "SignUp successful" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Username already exists" });
    } else {
      return res.status(500).json({ error: error.toString() });
    }
  }
};

const getUserWithDetails = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email);

    const user = await User.findOne({ email });
    // console.log("User obj : ", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else if (user.password === password) {
      return res.status(200).json({ message: "Login successful", user: user });
    } else {
      return res.status(401).json({ error: "Email/Password is incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users: users });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const updateRole = async (req, res) => {
  const emailId = req.body.email;
  const roles = req.body.role;
  // console.log("User email : ", emailId);
  // console.log("role ", roles);
  try {
    await User.updateOne({ email: emailId }, { role: roles });
    return res.status(200).json({ message: "Successfully updated user role" });
  } catch (error) {
    console.error("Update role error:", error);
    return res.status(500).json({ error: "Unable to change user role" });
  }
};

module.exports = {
  createUser,
  getUserWithDetails,
  allUsers,
  updateRole,
};
