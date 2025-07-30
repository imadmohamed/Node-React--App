import axios from "axios"
import { useState, useEffect } from "react"
import './App.css'

function App() {
const [users, setUsers] = useState([])
const [filterFunction, setFilterFunction] = useState([])

const getAllUsers = async () => {
  await axios.get("http://localhost:8000/users").then
  ((res) => {
    setUsers(res.data);
    setFilterFunction(res.data);
  });
}

useEffect(()=> {
  getAllUsers();
},[]);

//Search function
const handleSearchChange = (e) => {
  const searchText = e.target.value.toLowerCase();
  const filterFunction = users.filter((user) => 
    user.name.toLowerCase().includes(searchText) || user.city.toLowerCase().includes(searchText))
  setFilterFunction(filterFunction);
}

//Delete function
const handleDelete = async (id) => {
  await axios.delete("").then((res) => {
    
  })
}

  return (
    <>
      <div className='container'>
          <h2>CRUD application front end React and back end node</h2>

      <div className='input-seach'>
        <input type='search' placeholder="Search Text here" onChange={handleSearchChange}/>
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
          { filterFunction 
          && filterFunction.map((user,index)=>{
            return(
              <tr key={user.id}>
              <td>{index + 1 }</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
              <td><button className='btn green'>Edit</button></td>
              <td><button className='btn red' onClick={() => handleDelete (user.id)}>Delete</button></td>
            </tr>
            )
          }) 
          }
          
          </tbody>

        </table>

      </div>
    </>
  )
}

export default App
