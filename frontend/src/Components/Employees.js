import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employees.css';

function Employees() {
  const [employees, setEmployees] = useState([]); 
  const [isEditing, setIsEditing] = useState(false); 
  const [currentEmployee, setCurrentEmployee] = useState({}); 
  const [formData, setFormData] = useState({ name: '', surname: '', department: '', gender: '', salary: '' }); 
  const [showForm, setShowForm] = useState(false); 

  
  useEffect(() => {

    axios.get('http://localhost:1290/api/employees')
      .then((response) => {
        setEmployees(response.data); 
      })

      .catch((error) => {
        console.error('Error fetching employees:', error); 
      });

  }, []);

  
  
  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData, 
      [name]: value 
    });

  };

  
  const handleEdit = (employee) => {

    setIsEditing(true); 

    setCurrentEmployee(employee); 

    setFormData({
      name: employee.name,
      surname: employee.surname,
      department: employee.department,
      gender: employee.gender,
      salary: employee.salary
    }); 
   
    setShowForm(true); 

  };


  const handleDelete = (id) => {

    axios.delete(`http://localhost:1290/api/employees/${id}`)

      .then(() => {
        setEmployees(employees.filter((emp) => emp._id !== id));
      })

      .catch((error) => {
        console.error('Error deleting employee:', error); 
      });
  };

  
  const caseSensitiveData = (data) => {

    return {
      name: data.name.toLowerCase(),
      surname: data.surname.toLowerCase(),
      department: data.department.toLowerCase(),
      gender: data.gender.toLowerCase(),
      salary: data.salary.toLowerCase()
    };

  };

  
  const handleSubmit = (e) => {

    e.preventDefault(); 

    const normalizedData = caseSensitiveData(formData);

    if (isEditing) {
      
      axios.put(`http://localhost:1290/api/employees/${currentEmployee._id}`, normalizedData)

        .then((response) => {
          
          setEmployees(employees.map((emp) => emp._id === currentEmployee._id ? response.data : emp));
          setIsEditing(false); 
          setFormData({ name: '', surname: '', department: '', gender: '', salary: '' }); 
          setShowForm(false); 
        })

        .catch((error) => {
          console.error('Error updating employee:', error); 
        });

    } 

    else {
      
      axios.post('http://localhost:1290/api/employees', normalizedData)

        .then((response) => {
          setEmployees([...employees, response.data]);
          setFormData({ name: '', surname: '', department: '', gender: '', salary: '' });
          setShowForm(false);
        })

        .catch((error) => {
          console.error('Error adding employee:', error);
        });

    }
  };

  const handleAddEmployeeClick = () => {

    setShowForm(!showForm);

    if (showForm) {
      setFormData({ name: '', surname: '', department: '', gender: '', salary: '' });
      setIsEditing(false);
    }

  };

  return (

    <div className="employees-container">

      <h1 className="title">Employee List</h1>

      <button className="add-button" onClick={handleAddEmployeeClick}>
        {showForm ? 'Cancel' : 'Add Employee'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />

          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            placeholder="Surname"
          />

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="Department"
          />

          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            placeholder="Gender"
          />

          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            placeholder="Salary"
          />

          <button className="add-button" type="submit">

            {isEditing ? 'Update Employee' : 'Add Employee'}

          </button>

        </form>

      )}

      <table className="employees-table">

        <thead>

          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Department</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>CRUD Operations</th>
          </tr>

        </thead>

        <tbody>

          {employees.map((employee) => (

            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.surname}</td>
              <td>{employee.department}</td>
              <td>{employee.gender}</td>
              <td>{employee.salary}</td>

              <td>
                <button className="edit-button" onClick={() => handleEdit(employee)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Employees;
