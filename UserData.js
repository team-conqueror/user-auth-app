const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema(
    {
        name:String,
        usName:String,
        password : String,
        email: {type:String, unique:true},
        institute: String,
        role:String
    },
    {
       // collation: "UserInfo"
        collation: { locale: 'en_US', strength: 1 }
    }
);

mongoose.model("UserInfo",UserDataSchema);
