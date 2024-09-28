const Post=require('../models/Post')
const User = require('../models/User');
const {StatusCodes}=require('http-status-codes')
const {BadRequestError,NotFoundError}=require('../errors')


const userdata=async (req,res)=>{
    const {username}=req.query;
    if (!username) {
        throw new BadRequestError('Username is required');
    }
    try {
        const user = await User.findOne({ name: username }).select('email');
        if(!user){
            throw new NotFoundError('User not found');
        }
        res.status(StatusCodes.OK).json({username,email:user.email});
    }
    catch(error){
        if (error instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong while getting the data' });
        }
    }
}

module.exports={
    userdata,
};