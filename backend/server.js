require('dotenv').config();  

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes.js');

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)

  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => console.log(`Server running on ${HOST}:${PORT}`));

