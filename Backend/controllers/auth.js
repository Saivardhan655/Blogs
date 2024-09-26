const User=require('../models/User')
const bcrypt=require('bcryptjs')
const {StatusCodes}=require('http-status-codes')
const {BadRequestError,UnauthenticatedError}=require('../errors')
const login =async (req,res)=>{
    res.status(200).send('login called');
}
const register=async (req,res)=>{
    const user=await User.create({ ...req.body })
    //const token=user.createJWT()
    res.status(StatusCodes.CREATED).json({ user :{name:user.name}})
}

module.exports={
    login,
    register
}