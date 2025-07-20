const express = require('express');
const users = require('./sample.json');
const app = express();
const Port = 8000;


// Display All Users
app.get("/users", (req, res) => {
    return res.json(users);
});

app.listen(Port,(err) => {
    console.log(`App is running on port ${Port}`);
});