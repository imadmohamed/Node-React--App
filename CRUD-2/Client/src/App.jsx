import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    try {
      const res = await axios.get('http://localhost:8000/users');
      setUsers(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  //Search function
  const handlSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredUsers = 
  }

  return (
    <div className='container mx-auto px-4 py-10'>
      <p className='text-2xl font-bold text-center mb-6'>CRUD Application with React</p>

      <div className='flex justify-center mb-6 space-x-4'>
        <input
          type='text'
          placeholder='Search...'
          className='ring-1 ring-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500'
          onChange={handlSearchChange}
        />
        <button className='bg-amber-600 text-white px-4 py-2 rounded-sm hover:bg-amber-700'>
          Add Record
        </button>
      </div>

      <table className='table-auto w-full border border-gray-200 text-left'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-4 py-2 border'>S.No</th>
            <th className='px-4 py-2 border'>Name</th>
            <th className='px-4 py-2 border'>Age</th>
            <th className='px-4 py-2 border'>City</th>
            <th className='px-4 py-2 border'>Edit</th>
            <th className='px-4 py-2 border'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id || index} className='hover:bg-gray-50'>
                <td className='px-4 py-2 border'>{index + 1}</td>
                <td className='px-4 py-2 border'>{user.name}</td>
                <td className='px-4 py-2 border'>{user.age}</td>
                <td className='px-4 py-2 border'>{user.city}</td>
                <td className='px-4 py-2 border'>
                  <button className='bg-green-500 text-white px-3 py-1 rounded-sm hover:bg-green-600'>
                    Edit
                  </button>
                </td>
                <td className='px-4 py-2 border'>
                  <button className='bg-red-500 text-white px-3 py-1 rounded-sm hover:bg-red-600'>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='6' className='text-center px-4 py-4 text-gray-500'>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
