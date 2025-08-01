import './App.css'

function App() {

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
            <tr>
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

            <tr>
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

            <tr>
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
          </tbody>

        </table>
      </div>
    </>
  )
}

export default App
