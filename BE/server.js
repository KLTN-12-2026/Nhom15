
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const patientRoutes = require('./routes/patientRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hospital Management API is running!'
    });
});

app.use('/api/patients', patientRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
