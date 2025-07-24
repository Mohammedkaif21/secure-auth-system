const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const AuthRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth',AuthRoutes)
app.use('/api/auth',AuthRoutes)

sequelize.authenticate()
.then(()=>console.log("Database connected"))
.catch(err=> console.error("Database Error"))

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
    
})