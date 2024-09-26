const User=require('../models/User')
const bcrypt=require('bcryptjs')
const {StatusCodes}=require('http-status-codes')
const {BadRequestError,UnauthenticatedError}=require('../errors')

const register=async (req,res)=>{
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use.' });
    }
    const user=await User.create({ ...req.body })
    const token=user.createJWT()
    res.status(StatusCodes.CREATED).json({ user :{name:user.name},token})
}

const login=async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        throw new BadRequestError('Please provide email and password')
    }
    const user=await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect=await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token=user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
}

module.exports={
    login,
    register
}