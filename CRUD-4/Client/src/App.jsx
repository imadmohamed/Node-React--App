import './App.css'
import axios from "axios";
import { useState, useEffect } from 'react';

function App() {

  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([])
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [userData, setUserData] = useState({name:"", age:"", city:""})

  const getAllUsers = async () => {
    await axios.get("http://localhost:8000/users").then((res) => {
      setUsers(res.data)
      setFilterUsers(res.data)
    })
    
  }

  useEffect(() => {
      getAllUsers();
  },[])

  //Search function
const handleSearch = (e) => {
  const searchtext = e.target.value.toLowerCase();
  const filterUsers = users.filter((user) => user.name.toLowerCase().includes(searchtext)
  || user.city.toLowerCase().includes(searchtext));
  setFilterUsers(filterUsers)
}

//Delete function
const handleDelete = async (id) => {
  await axios.delete(`http://localhost:8000/users/${id}`).then((res)=> {
    setUsers(res.data);
    setFilterUsers(res.data)
  })
}

//Add user details
const handleAddRecord = () => {
  setUserData({name:"", age:"", city:""});
  setIsModelOpen(true);
}

//model close

const handleClose = () => {
  setIsModelOpen(false)
  getAllUsers()
}

const handleData = (e) => {
  setUserData({...userData, [e.target.name]: e.target.value})
}

const handleSubmit = async (e) => {
  e.preventDefault();

  if (userData.id) {
    await axios.patch(`http://localhost:8000/users/${userData.id}`, userData);
  } else {
    await axios.post("http://localhost:8000/users", userData);
  }

  handleClose();
  setUserData({ name: "", age: "", city: "" });
};


// update user function
const handleUpdateRecord = (user) => {
  setUserData(user)
  setIsModelOpen(true)
}


  return (
    <>
      <div className='container'><h3>CRUD APP front end react and Back end Node.js</h3>
        <div className='input-search'>
          <input type='Search' placeholder='Search' onChange={handleSearch}/>
          <button className=' btn green ' onClick={handleAddRecord}>Add Record</button>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          
          <tbody>
           {filterUsers && filterUsers.map((user, index) => {
            return (
             <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
              <td>
                <button className='btn green' onClick={() => handleUpdateRecord(user)}>Edit</button>
              </td>
              <td>
                <button className='btn red'onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
           )
          })}
            
          </tbody>
        </table>
        {isModelOpen && (
          <div className='model'>
            <div className='model-control'>
              <span className='close' onClick={handleClose}>&times;</span>
              <h2>User Record</h2>
              <div className="input-group">
                <lable htmlFor="name">Full Name</lable>
                <input type='text' value={userData.name} name='name' id='name' onChange={handleData}/>
              </div>

              <div className="input-group">
                <lable htmlFor="age">Age</lable>
                <input type='number' value={userData.age} name='age' id='age' onChange={handleData}/>
              </div>

              <div className="input-group">
                <lable htmlFor="city">City</lable>
                <input type='text' value={userData.city} name='city' id='city' onChange={handleData}/>
              </div>
              <button className='btn green' onClick={handleSubmit}>Add User</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
