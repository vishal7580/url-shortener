import mongoose from "mongoose";


const urlSchema = new mongoose.Schema({
    short_url:{
        type: String,
        required: true,
        unique: true
    },
    full_url:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '120m' //validity of url created by guest user
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

urlSchema.pre('save',function(next) {
    if(this.isModified('full_url')){
        this.full_url = this.full_url.trim().toLowerCase()
    }
    next()
})

export default mongoose.model('Url',urlSchema)