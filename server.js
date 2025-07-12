require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.js');
const { verifyToken } = require('./middleware/verifyToken.js');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to Evaldemy API");
});

app.listen(5000, () => console.log("Server stared on http://loalhost:5000"));
