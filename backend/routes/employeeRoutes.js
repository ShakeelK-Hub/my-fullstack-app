const express = require('express');
const Employee = require('../models/employee.js');

const router = express.Router();

router.get('/', async (req, res) => {

  try 
  {

    const employees = req.query.department 

      ? await Employee.find({ department: req.query.department }) 
      : await Employee.find();

    res.json(employees);

  } 

  catch (error) 
  {
    res.status(500).json({ error: error.message });
  }

});

router.post('/', async (req, res) => {

  try 
  {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } 

  catch (error) 
  {
    res.status(400).json({ error: error.message });
  }

});

router.put('/:id', async (req, res) => {
  try 
  {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEmployee);
  } 

  catch (error) 
  {
    res.status(400).json({ error: error.message });
  }

});

router.delete('/:id', async (req, res) => {
  try 
  {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } 
  
  catch (error) 
  {
    res.status(400).json({ error: error.message });
  }
  
});

module.exports = router;

