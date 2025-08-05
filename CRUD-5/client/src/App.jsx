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
  setIsModelOpen(open)
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
          </div>
          
      
    </>
  )
}

export default App
