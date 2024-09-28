const mongoose=require('mongoose')
const PostSchema=new mongoose.Schema({
    type:{
        type: [String],
        enum: ['info', 'comedy', 'religious', 'sports','politics','drama','others'],
        required: true
    },
    content:{
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