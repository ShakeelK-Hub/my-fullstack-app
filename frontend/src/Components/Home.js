import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import "./Home.css";

function Home() {
  const [employees, setEmployees] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {

    try 
    {
      const response = await axios.get("http://localhost:1290/api/employees");
      setEmployees(response.data);

      const departmentCounts = response.data.reduce((acc, emp) => 
        {
        acc[emp.department] = (acc[emp.department] || 0) + 1;
        return acc;
        },
        
        {});

      const formattedData = Object.keys(departmentCounts).map((dept) => ({
        department: dept,
        count: departmentCounts[dept],
      }));

      setDepartmentData(formattedData);

    } 

    catch (error) 
    {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Employee Directory</h1>
      </header>

      <div className="home-grid">
      
        <div className="stats-container">

          <h2>Employee Statistics</h2>
          <p>Total Employees: <b>{employees.length}</b></p>
          <p>Top Department: <strong>{departmentData.length > 0 ? departmentData.reduce((max, dept) => dept.count > max.count ? dept : max).department : "N/A"}</strong></p>
          
        </div>

       
        <div className="recent-employees">

          <h2>Recently Added Employees</h2>

          <ul>
            {employees.slice(-4).reverse().map((emp) => (

              <li key={emp._id}>
                <b>{emp.name} {emp.surname}</b>  {emp.department}
              </li>

            ))}

          </ul>

        </div>

        <div className="chart-container">

          <h2>Department Distribution</h2>

          <ResponsiveContainer width="100%" height={250}>

            <BarChart data={departmentData}>

              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip 
              contentStyle = {{color: "#00000", borderRadius: "15px", border: "2.5px solid #103f79" }}
              />


              <Bar 
              dataKey="count" 
              fill="#103f79"  
              barSize={60} 
              activeBar={{ fill: "#2a6fcf", transform: "translateX(-10px)" }}  
              />

            </BarChart>

          </ResponsiveContainer>

        </div>
      </div>
    </div>
  );
}

export default Home;

