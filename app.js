const express=require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors())
const  bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = "abcdwxyz123456";
const mongoURL = "mongodb+srv://admin:admin@cluster0.bdhrw5h.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURL,{
    useNewUrlParser:true
}).then(()=>{console.log("connected");})
    .catch((e) => console.log(e));

app.listen(5000,() =>{
    console.log("server is up");
});

require("./UserData");
const User = mongoose.model("UserInfo");

//User register part
app.post("/register",async (req,res)=>{
    const {name,uName,password,email,institute,role} = req.body;
    const encryptPassword = await bcrypt.hash(password,10);
    try {

        const oldUser = await User.findOne({email})
         if (oldUser){
             return res.send({status:"User already registered! "});
         }
         else {
             await User.create({
                 name,
                 uName,
                 password: encryptPassword,
                 email,
                 institute,
                 role
             });
         }
        res.send({status:"Ok"});
    }
    catch (e) {
        console.log (e);
        res.send({status:e});
    }
})
//User Login part
app.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    try {

        const user = await User.findOne({email})
        if (!user){
            return res.send({status:"User Not Found"});
        }

        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign({user: user},jwt_secret);
            if(res.status(201)){
                return res.json({status:"ok",data:token});
            }
            else {
                return res.json({status:"Error"});
            }
        }
        res.json({status:"error",Error:"Password not correct!"})
    }
    catch (e) {
        console.log (e);
        res.send({status:e});
    }
})

app.post("/userDtl",(req,res)=>{
    console.log("hi")
    const token = req.body.token;
    console.log(req.body)
    try {
        const user = jwt.verify(token,jwt_secret)

          if(user) {
              res.send({status:"ok",user:user});
          } else {
              res.send({status: "Error", data: "User not Found"});
          }
    }
    catch (error) {}
})
