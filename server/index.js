const express = require('express');
const users = require('./sample.json')

const app = express();
const port = 8000;

//Display all user
app.get("/users" , (req,res) => {
    return res.json(users)
})


app.listen(port, (err) => {
    console.log(`App is running in port ${port}`)
})
