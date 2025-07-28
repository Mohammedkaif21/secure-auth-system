const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

router.get('/protected',auth,(req,res)=>{
    res.json({message:`Hello user ${req.user.userid}, Access protected route`})
});

module.exports = router