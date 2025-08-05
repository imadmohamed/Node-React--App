import './App.css'
import axios from "axios"
import { useState, useEffect } from 'react'


function App() {

  const [users, setUser] = useState([])
  const [filterUser, setFilterUser] = useState([])
  
  const getAllUsers = async () => {
    await axios.get("http://localhost:8000/users").then((res) =>{
      setUser(res.data)
      console.log(res.data)
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

  return (
    <>
      <div className='container'>
          <h2>CRUD App using React and nodejs</h2>
          <div className='input-search'>
            <input type='search' 
            placeholder='Search text here'
            onChange={handleSearch}
            />
            <button className='btn green'>Add Record</button>
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
                  <td><button className='btn red'>Delete</button></td>
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
