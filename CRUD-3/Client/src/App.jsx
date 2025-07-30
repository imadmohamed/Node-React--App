import axios from "axios";
import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [filterFunction, setFilterFunction] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "", age: "", city: "" });

  const getAllUsers = async () => {
    await axios.get("http://localhost:8000/users").then((res) => {
      setUsers(res.data);
      setFilterFunction(res.data);
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Search function
  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchText) ||
      user.city.toLowerCase().includes(searchText)
    );
    setFilterFunction(filtered);
  };

  // Delete function
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/users/${id}`).then((res) => {
      setUsers(res.data);
      setFilterFunction(res.data);
    });
  };

  // Add User Details
  const handleAddRecord = () => {
    setUserData({ name: "", age: "", city: "" });
    setIsModelOpen(true);
  };

  // Close modal
  const closeModel = () => {
    setIsModelOpen(false);
    getAllUsers();
  };

  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.id) {
      await axios.patch(`http://localhost:8000/users/${userData.id}`, userData).then((res) => {
        console.log(res);
        closeModel();
        setUserData({ name: "", age: "", city: "" });
      });
    } else {
      await axios.post("http://localhost:8000/users", userData).then((res) => {
        console.log(res);
        closeModel();
        setUserData({ name: "", age: "", city: "" });
      });
    }
  };

  // Update user function
  const handleUpdateRecord = (user) => {
    setUserData(user);
    setIsModelOpen(true);
  };

  return (
    <>
      <div className='container'>
        <h2>CRUD application front end React and back end node</h2>

        <div className='input-seach'>
          <input type='search' placeholder="Search Text here" onChange={handleSearchChange} />
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
            {filterFunction &&
              filterFunction.map((user, index) => {
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
                      <button className='btn red' onClick={() => handleDelete(user.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {isModelOpen && (
          <div className="model">
            <div className="model-content">
              <span className="close" onClick={closeModel}>&times;</span>
              <h3>User Record</h3>

              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" value={userData.name} onChange={handleData} name="name" id="name" />
              </div>

              <div className="input-group">
                <label htmlFor="age">Age</label>
                <input type="number" value={userData.age} onChange={handleData} name="age" id="age" />
              </div>

              <div className="input-group">
                <label htmlFor="city">City</label>
                <input type="text" value={userData.city} onChange={handleData} name="city" id="city" />
              </div>

              <button className="btn green" onClick={handleSubmit}>Add User</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
