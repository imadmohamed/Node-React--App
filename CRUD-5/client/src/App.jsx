import './App.css'
import axios from "axios"
import { useState, useEffect } from 'react'


function App() {

  const [users, setUser] = useState([])
  const [filterUser, setFilterUser] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [userData, setUserData] = useState({name:"", age:"", city:""})
  
  const getAllUsers = async () => {
    await axios.get("http://localhost:8000/users").then((res) =>{
      setUser(res.data)
      setFilterUser(res.data)
    })
  }

  useEffect( () => {
    getAllUsers()
  },[]);

  //search function

  const handleSearch = (e) => {
    const textSearch = e.target.value.toLowerCase();
    const filterdUser = users.filter((user) => 
      user.name.toLowerCase().includes(textSearch) || user.city.toLowerCase().includes(textSearch))
      setFilterUser(filterdUser);
  }

  //handle delete funciton

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/users/${id}`).then((res) => {
      setUser(res.data)
      setFilterUser(res.data)
    })
  }

//Add user details

const handleAddRecord = () => {
  setUserData({name:"", age:"", city:""})
  setIsModelOpen(true)
}

//colose model
const closeModel  =() =>{
  setIsModelOpen(false)
}

const handleChange = (e) => {
  setUserData({...userData, [e.target.name]: e.target.value})
}

//handle submit function

const handleSubmit = async(e) => {
  e.preventDefault();
  await axios.post("http://localhost:8000/users",userData).then((res)=>{
    console.log(res)
  })
}
  return (
    <>
      <div className='container'>
          <h2>CRUD App using React and nodejs</h2>
          <div className='input-search'>
            <input type='search' 
            placeholder='Search text here'
            onChange={handleSearch}
            />
            <button className='btn green' onClick={handleAddRecord}>Add Record</button>
            </div>
            <table className='table'>
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>City</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {filterUser && filterUser.map((user, index)=> {
                  return (
                    <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.city}</td>
                  <td><button className='btn green'>Edit</button></td>
                  <td><button className='btn red'onClick={()=> handleDelete(user.id)}>Delete</button></td>
                </tr>
                  )
                })}
              </tbody>
            </table>
            {isModelOpen && (<div className='model'>
                <div className='model-content'>
                  <span className="close" onClick={closeModel}>
                    &times;
                  </span>
                  <h3>User Record</h3>
                  <div className="input-group">
                    <lable htmlFor="name">Full Name</lable>
                    <input type='text' value={userData.name} name='name' id='name'onChange={handleChange}/>
                  </div>

                  <div className="input-group">
                    <lable htmlFor="age">Age</lable>
                    <input type='number' value={userData.age} name='age' id='age' onChange={handleChange}/>
                  </div>

                  <div className="input-group">
                    <lable htmlFor="city">City</lable>
                    <input type='text' value={userData.city} name='city' id='city' onChange={handleChange}/>
                  </div>
                  <button className='btn green' onClick={handleSubmit}>Add user</button>
                </div>
              </div>)}
          </div>
          
      
    </>
  )
}

export default App
