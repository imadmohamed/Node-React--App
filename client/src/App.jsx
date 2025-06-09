import './App.css'

function App() {

  return (
    <>
      <div className='container'>
        <h3>CRUD applicatioin with React.js Front end Node.js For Backend test</h3>

        <div className='input-search'> 
          <input type='search'/>
          <button className='btn green'>Add Record</button>
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
            <tr>
              <td>1</td>
              <td>Imad</td>
              <td>25</td>
              <td>Kalmunai</td>
              <td>
                <button className='btn green'>Add</button>
              </td>
              <td>
                <button className='btn red'>Edit</button>
              </td>
            </tr>

             <tr>
              <td>2</td>
              <td>Imad</td>
              <td>25</td>
              <td>Kalmunai</td>
              <td>
                <button className='btn green'>Add</button>
              </td>
              <td>
                <button className='btn red'>Edit</button>
              </td>
            </tr>

             <tr>
              <td>3</td>
              <td>Imad</td>
              <td>25</td>
              <td>Kalmunai</td>
              <td>
                <button className='btn green'>Add</button>
              </td>
              <td>
                <button className='btn red'>Edit</button>
              </td>
            </tr>
          </tbody>

        </table>

      </div>
    </>
  )
}

export default App
