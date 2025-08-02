import './App.css'
import axios from "axios";
import { useState, useEffect } from 'react';

function App() {

  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([])

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

  return (
    <>
      <div className='container'><h3>CRUD APP front end react and Back end Node.js</h3>
        <div className='input-search'>
          <input type='Search' placeholder='Search' onChange={handleSearch}/>
          <button className=' btn green '>Add Record</button>
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
                <button className='btn green'>Edit</button>
              </td>
              <td>
                <button className='btn red'>Delete</button>
              </td>
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
