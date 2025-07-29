const express = require("express");
const users = require("./sample.json")

const app = express();
const port = 8000

//Display All Users
app.get("/user", (req, res) => {
    return response.json(users)
})

app.listen(port, (err) => {
    console.log(`App is runnding in port ${port}`)
})