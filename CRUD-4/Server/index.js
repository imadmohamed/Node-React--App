const express = require ("express")
const users = require("./sample.json")
const cors = require("cors")
const fs = require("fs")

const app = express()
const port = 8000;
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
})
);

//Display all users

app.get("/users", (req,res) => {
    return res.json(users)
})

//Delete User details
app.delete("/users/:id", (req, res) => {
  let id = Number(req.params.id); 
  let filterdUser = users.filter((user) => user.id !== id); 
  fs.writeFile("./sample.json", JSON.stringify(filterdUser), (err, data) => {
    return res.json(filterdUser);
  });
});

//Edit function


app.listen(port, (err) => {
    console.log(`app is runnig in port number ${port}`)
})