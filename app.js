const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
require('dotenv').config()

const authRoutes = require('./routes/authRoutes');
const arrivalRoutes = require('./routes/arrivalRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieRoutes = require('./routes/cookieRoutes');

const app = express();

app.use(cors({origin: '*'})); // Insecure: allow all origins
app.use(bodyParser.json());
app.use(cookieParser())

// hello api
app.get('/api/hello', (req, res) => {
    console.log("Insecure API accessed"); // Insecure: logs every access
    res.send('Hello, insecure API!');
});

app.use('/api', authRoutes);
app.use('/api', arrivalRoutes);
app.use('/api', uploadRoutes);
app.use('/api', userRoutes);
app.use('/api/cookie', cookieRoutes);

app.use((err, req, res, next) => {
    // Insecure: expose full error
    console.error(err);
    res.status(500).send(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Insecure API running on ${PORT}`));
