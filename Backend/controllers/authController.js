const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User,Token } = require('../models');
const token = require('../models/token');

// --------------------SIGNUP-------------------------------
exports.signup  = async(req,res) =>{
    try{
        const { name,email,password } = req.body;
        const existingUser = await User.findOne({where:{email}})
        if(existingUser) return res.status(400).json({message:'User already exists'})

        const hashedPassword = await bcrypt.hash(password,12);

        const user = await User.create({name,email,password:hashedPassword});
        res.status(200).json({message:'User Created',user})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

// -----------------------LOGIN------------------------------------
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if(!user){
            return res.status(404).json({ message: "User not found" })
        }
        
        console.log('userId: ',user.id);
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" })

        const accessToken = jwt.sign({ userid: user.id }, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
        const refreshToken = jwt.sign({ userid: user.id }, process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'});
        await Token.create({
            token: refreshToken,
            user_id: user.id,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })
        res.status(200).json({
            message: 'LogedIn Successfully',
            accessToken,
            refreshToken
        })

    } catch (err) {
        res.status(500).json({ error:err.message});
    }
}

// -------------------------REFRESH TOKEN-----------------------------
exports.refreshTokens = async(req,res)=>{
    try{
        const { refreshToken } = req.body;
        if(!refreshToken){
            return res.status(401).json({message:'Refresh Token  is required'})
        }

        const storedToken = await Token.findOne({where:{token:refreshToken}})
        if(!storedToken){
            return res.status(403).json({message:
                'Refresh token not found'})
        }


        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,async(err,decoded)=>{
            if(err){
                return res.status(403).json({message:'Invalid or expired refresh token'})
            }
            await storedToken.destroy();
            const newAccessToken =jwt.sign(
                {userid:decoded.userid},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:process.env.ACCESS_TOKEN_EXPIRES || '15m'}
            );
            const newRefreshToken = jwt.sign(
                { userid: decoded.userid },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '7d' }
            );
            await Token.create({
                token:newRefreshToken,
                user_id:decoded.userid,
                expires:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            })
            res.status(200).json({accessToken:newAccessToken,newRefreshToken})
        })
    }catch(err){
        res.status(500).json({error:err.message});
    }
}