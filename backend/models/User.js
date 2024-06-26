import mongoose from 'mongoose';

const {Schema ,model} =mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['user','superuser','admin']
    },
    password:{
        type:String,
        required:true
    },
    // phone:{
    //     type:String,
    //     required:true
    // },
    // address:{
    //     type:String,
    //     required:true
    // },
    // isAdmin:{
    //     type:Boolean,
    //     required:true,
    //     default:false
    // }
})


const User = model('User',userSchema);

export default User;