const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:50,
        unique:true,
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        match:[/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,'Please provide the correct email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minlength:8,
    },
    likedPosts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post', // References to liked posts
      }],
      favoriteTags: [{
        type: String, // Store favorite tags based on interactions
      }],
})
UserSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

UserSchema.methods.createJWT=function(){
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword=async function(candidatePassword){
    const isMatch=await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}
module.exports=mongoose.model('User',UserSchema)