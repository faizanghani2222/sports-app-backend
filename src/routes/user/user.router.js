const express=require("express")
const jwt=require("jsonwebtoken")
require('dotenv').config()

const secretkey=process.env.SECRET_KEY
const app=express.Router()
const User=require("./user.model.js")

app.get("/", async(req,res)=>{
    try{
       let user=await User.find()
        res.send(user)
    }catch(e){
        res.status(401).send({message:"failed",error:e})
    }
})


app.post("/signup", async(req,res)=>{
    try{
        let user=new User(req.body)
        user=await user.save()
        res.send(user)
    }catch(e){
        res.status(401).send({message:"signup failed",error:e})
    }
})

app.post("/login", async(req,res)=>{
    try{
        const {username,password}=req.body
        const user=await User.findOne({username,password})
        if(!user){
            res.status(401).send({message:"Invalid credentials"})
        }else{
            const token = jwt.sign({ username }, secretkey)
            res.send({user, token })
        }
    }catch(e){
        console.log(e)
        res.status(401).send({message:e,error:e})
    }
})

module.exports=app