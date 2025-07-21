const express = require('express');
const users = require('./sample.json');
const cors = require('cors');

const app = express();
const Port = 8000;
app.use(
    cors({
        origin: "http://localhost:5173",
        methods:["GET", "POST", "PATCH", "DELETE"]
    })
);


// Display All Users
app.get("/users", (req, res) => {
    return res.json(users);
});

app.listen(Port,(err) => {
    console.log(`App is running on port ${Port}`);
});