import React, { useState} from 'react';
import axios from 'axios';
import './Department.css';


function Department() {
  const [department, setDepartment] = useState('');
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {

    axios.get(`http://localhost:1290/api/employees?department=${department.toLowerCase()}`)
      .then((res) => setEmployees(res.data))
      .catch((error) => console.error(error));
  };


  return (
<div className='one'>

    <div className="container">

    <h1>Filter by Department</h1>

    <input type="text" placeholder="Enter department" onChange={(e) => setDepartment(e.target.value)} />

    <button onClick={fetchEmployees}>Search</button>

  <ul>

    {employees.map((emp) => (
      <li key={emp._id}>{emp.name} {emp.surname} - {emp.department}</li>
    ))}
    
  </ul>
  
</div></div>

  );
}

export default Department;
