const express = require("express");
const {UsersprofileModel} = require("../Models/Usersprofile.model")

const getprofile = express.Router();

getprofile.get("/:email", async (req, res)=>{
    const email = req.params.email
    const profile = await UsersprofileModel.find({email})
  return  res.send(profile)
})

getprofile.post('/calculate/:email', async (req, res)=>{
    const email = req.params.email
    const {height, weight} = req.body;
   let h = height * 0.3048
   h = h*h
   const bmi = weight/h
const {history,_id} = await UsersprofileModel.findOne({email})
history.push(bmi)

 await UsersprofileModel.findByIdAndUpdate({_id: _id},{$set:{history: history}})
   return res.send({msg: bmi})
})

module.exports = { getprofile }