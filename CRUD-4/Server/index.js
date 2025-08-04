// const express = require ("express")
// const users = require("./sample.json")
// const cors = require("cors")
// const fs = require("fs")

// const app = express()
// const port = 8000;
// app.use(express.json())

// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PATCH", "DELETE"],
// })
// );

// //Display all users

// app.get("/users", (req,res) => {
//     return res.json(users)
// })

// //Delete User details
// app.delete("/users/:id", (req, res) => {
//   let id = Number(req.params.id); 
//   let filterdUser = users.filter((user) => user.id !== id); 
//   fs.writeFile("./sample.json", JSON.stringify(filterdUser), (err, data) => {
//     return res.json(filterdUser);
//   });
// });

// // add new user

// app.post("/users", (req,res) => {
//   let {name, age, city} = req.body;
//   if(!name || !age || !city){
//     res.status(400).send({message: "All feild require"})
//   }
//   let id = Date.now();
//   users.push({id, name, age, city})
//   fs.writeFile("./sample.json", JSON.stringify(users), (err, data) => {
// return res.json({"message":"user details added success"})
//   });

// return res.json({"message":"user details added success"})
// })

// //update user
// app.patch("/users/:id", (req, res) => {
//     let id = Number(req.params.id);
//     let{name, age, city} = req.body;
//     if(!name || !age || !city) {
//       res.status(400).send({message:"All feilds Require "});
//     }

//     let index = users.findIndex((user) => user.id == id);
//     users.splice(index,1,{...req.body})

//     fs.writeFile("./sample.json", JSON.stringify(users),
//     (err, data => {
//       return res.json({
//         message:"Updated succece"
//       })
//     })
//   )
// })

// app.listen(port, (err) => {
//     console.log(`app is runnig in port number ${port}`)
// })


const express = require("express");
const users = require("./sample.json");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 8000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE"],
}));

// Display all users
app.get("/users", (req, res) => {
  return res.json(users);
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const filteredUsers = users.filter((user) => user.id !== id);

  fs.writeFile("./sample.json", JSON.stringify(filteredUsers, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting user" });
    }
    return res.json(filteredUsers);
  });
});

// Add new user
app.post("/users", (req, res) => {
  const { name, age, city } = req.body;

  if (!name || !age || !city) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const id = Date.now();
  users.push({ id, name, age, city });

  fs.writeFile("./sample.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Error saving user data" });
    }
    return res.json({ message: "User details added successfully" });
  });
});

// 🔴 FIXED: Wrong method name `app.path` → should be `app.patch`
// 🔴 Also fixed callback parentheses
app.patch("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, age, city } = req.body;

  if (!name || !age || !city) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = { id, name, age, city };

  fs.writeFile("./sample.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Error updating user data" });
    }
    return res.json({ message: "User updated successfully" });
  });
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
