const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const { router, apiProtected } = require('./routes/api');
const { AuthMiddleware } = require('./middleware/check');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', router);
app.use('/api/', AuthMiddleware, apiProtected);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
