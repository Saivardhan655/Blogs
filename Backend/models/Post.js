const mongoose=require('mongoose')
const PostSchema=new mongoose.Schema({
    Type:{
        type:String,
        required:[true,'Please provide type of post'],
        maxlength:50
    },
    Content:{
        type:String,
        required:[true,'PLease provide type of content'],
        maxlength:3000,
    },
    likes:{
        type:Number,
        required:[true,'Please provide position']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    }
},{timestamps:true})

module.exports=mongoose.model('Post',PostSchema)