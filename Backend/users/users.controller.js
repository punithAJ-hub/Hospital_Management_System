
const util = require('../util');
const User = require('./users.model');

const createUser = async (req, res) => {
    const  body  = req.body;
    console.log(body);

    try {
        const userDoc = new User(body);
        console.log("Recieved in createUser");
        console.log(userDoc);
        const user = await userDoc.save();
        return res.status(200).json({ message: 'SignUp successful' });
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error code
            return res.status(400).json({ error: 'Username already exists' });}
        else {
            return res.status(500).json({ error: error.toString() });
        }
    }
};

const updateUser = async (req, res) => {
    const { params, body } = req;
    const id = params.id;

    try {
        // updateOne returns an update acknowledgement
        // BUT findOneAndUpdate returns the actual mongo doc
        // { new: true } indicates that we get the updated version of the document
        const user = await User.findOneAndUpdate({ _id: id }, body, {
            new: true
        });

        if (user) {
            console.log(user);
            res.json(user);
        } else {
            res.status(404).json({ error: `No Professor found by id: ${id}` });
        }
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error code
            res.status(400).json({ error: 'Username already exists' });}
        else {
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
        console.log("User obj : " ,user);

        // If no user is found with the provided email
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // If user is found, check if the provided password matches the user's password
        else if (user.password === password) {
            // Password matches, return a success response
            return res.status(200).json({ message: 'Login successful' });
        } else {
            // Password doesn't match, return an unauthorized response
            return res.status(401).json({ error: 'Email/Password is incorrect' });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({ error: error.message });
    }
};



module.exports = {
    createUser,
    updateUser,
    getUserWithDetails
};