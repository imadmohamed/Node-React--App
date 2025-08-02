import './App.css'
import axios from "axios";
import { useState, useEffect } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    await axios.get("http://localhost:8000/users").then((res) => {

      setUsers(res.data)

    })
    
  }

  useEffect(() => {
      getAllUsers();
  },[])

  return (
    <>
      <div className='container'><h3>CRUD APP front end react and Back end Node.js</h3>
        <div className='input-search'>
          <input type='Search' placeholder='Search'/>
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
           {users && users.map((user) => {
            return (
             <tr key={user.id}>
              <td>1</td>
              <td>Imad</td>
              <td>22</td>
              <td>Kalminai</td>
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
