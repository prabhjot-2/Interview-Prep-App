const mongoose =require("mongoose");

const UserSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        profileImageUrl:{type:String, default:null},
    },
    {timeStamps:true}
);

module.exports=mongoose.model("User",UserSchema);