const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to database
connectDB();

// Use routes
app.use('/rules', ruleRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
