const mongoose=require('mongoose')

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
        dropDups: true,
        unique:true,
    },
    password:{
        type:String,
        minlength:3,
        require:[true,'please enter password'],
    }
})

module.exports=mongoose.model('User',UserSchema)