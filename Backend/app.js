
const express = require('express');
const config = require('config');
const app = express();
const cors = require("cors");
const port = config.get('server.port');
const host = config.get('server.host');
const {connectDB} = require('./mongo/index');
const userRouter = require('./users/users.route'); // Ensure the correct path to your users router file



const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };
app.use(cors(corsOptions));  
// Mount the user router on a specific path
app.use('/users', userRouter);


// Start the Express server
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    connectDB();
});

