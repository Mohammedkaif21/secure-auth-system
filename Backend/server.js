const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const { sequelize } = require('./models');
const AuthRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.use('/api/auth',AuthRoutes)
app.use('/api',protectedRoutes)

sequelize.authenticate()
.then(()=>console.log("Database connected"))
.catch(err=> console.error("Database Error"))

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
    
})