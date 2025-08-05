const express = require ("express");
const users = require("./sample.json")
const cors = require("cors");
const fs = require("fs");


const app = express()
const port = 8000

app.use(cors({
    origin:"http://localhost:5173",
    methods:["POST, GET, PATCH, DELETE"]
}))


//Display all users
app.get("/users", (req, res)=> {
    return res.json(users)
})

//Delete user details

app.delete("/users/:id", (req,res)=> {
    let id = Number(req.params.id);
    let filterdUsers = users.filter((user)=> user.id !== id)
    fs.writeFile("./sample.json",JSON.stringify(filterdUsers),(err , data) => {
        return res.json(filterdUsers)
    })

})

app.listen(port, (err)=> {
    console.log(`app is runnig is port number ${port}`)
})