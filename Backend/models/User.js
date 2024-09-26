const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        requires:[true,'please enter password'],
        minlength:3,
        maxlength:50,
    },
    email:{
        type:String,
        match:[/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,'please provide eamil'],
        required:true,
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        minlength:3,
        require:[true,'please enter password'],
    }
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