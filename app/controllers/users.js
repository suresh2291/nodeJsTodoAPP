'use strict'
const express = require('express')
const router = express.Router()
const userdata = require('../models/userModel')
const { Validator } = require('node-input-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const routeProtect = require('../../config/auth.js')
router.post('/createUser', async (req, res) => {
    const validateUserData = new Validator(req.body, {
        FirstName:'required|alpha',
        LastName:'required|alpha',
        Email: 'required|email',
        Password:'required|alphaNumeric'
    });
    let matched = await validateUserData.check()
    console.log(matched)
    if (!matched) {
        return res.status(400).send(validateUserData.errors)
      }else{
       const password = await bcrypt.hash(req.body.Password, 10)
       userdata.createTodoUser(req.body,password,(err,result)=>{
           if(err){
            return res.status(500).send({"message":err.sqlMessage})//send({err.sqlMessage})
           }else if(res.statusCode == 200){
            return res.status(200).send({"message":"Created,Please save/note-down your password safely in your system"})
           }else{
            return res.status(400).send({"message":"Bad Request"})
           }
       })
    }
})

router.post('/login', (req, res) => {
    userdata.getUserDataEmail(JSON.stringify(req.body.Email),async (err,userData)=>{
        console.log('userdata  ',userData)
        const generatetoken = await jwt.sign({Id:userData[0].Id},'myPrivateKey') 
       let comparePassword = await bcrypt.compareSync(req.body.Password, userData[0].Password)
       const decode = await jwt.verify(generatetoken,'myPrivateKey')
       console.log('password ',comparePassword , ' jwt token result ', decode)
        if(err ){
            return res.status(500).send({"message":err.sqlMessage})//send({err.sqlMessage})
           }else if(userData.length == 0){
            return res.status(404).send({"message":"No Data Found In Database"})
           }else if(comparePassword == true && decode.Id == userData[0].Id){
        //    }else if(comparePassword == true){
            return res.status(200).send({"message":"User Data Match and Logged In Successfully", "token":generatetoken})
           }else{
            return res.status(400).send({"message":"Please Check Your EmailID or Password"})
           }
    })
})

router.get('/getAllUsers', async (req, res) => {
    userdata.getUserData((err,result)=>{
        if(err ){
            return res.status(500).send({"message":err.sqlMessage})//send({err.sqlMessage})
           }else if(result.length == 0){
            return res.status(404).send({"message":"No Data Found In Database"})
           }else if(res.statusCode == 200){
            return res.status(200).send({"message":result})
           }else{
            return res.status(400).send({"message":"Bad Request"})
           }
    })
})

router.get('/getUsersById/:userId', routeProtect,async  (req, res) => {
    userdata.getUserDataById(req.params.userId,(err,result)=>{
        if(err ){
            return res.status(500).send({"message":err.sqlMessage})//send({err.sqlMessage})
           }else if(result.length == 0 ){
            return res.status(404).send({"message":"No Data Found In Database"})
           }else if(res.statusCode == 200){
            return res.status(200).send({"message":result})
           }else{
            return res.status(400).send({"message":"Bad Request"})
           }
    })
})

//UPDATING USER DATA
router.patch('/updateUserData/:userId', routeProtect, async (req, res) => {
    userdata.updateUserData(req.body,req.params.userId,(err,result)=>{
        if(err ){
            return res.status(500).send({"message":err.sqlMessage})//send({err.sqlMessage})
           }else if(result.length == 0 ){
            return res.status(404).send({"message":"No Data Found In Database"})
           }else if(res.statusCode == 200){
            return res.status(200).send({"message":result})
           }else{
            return res.status(400).send({"message":"Bad Request"})
           }
    })
})

router.delete('/deleteUserData/:userId', routeProtect, async (req, res) => {
    userdata.deleteUser(req.params.userId,(err,result)=>{
        if(err ){
            return res.status(500).send({"message":err.sqlMessage})//send({err.sqlMessage})
           }else if(result.length == 0 ){
            return res.status(404).send({"message":"No Data Found In Database"})
           }else if(res.statusCode == 200){
            return res.status(200).send({"message":result})
           }else{
            return res.status(400).send({"message":"Bad Request"})
           }
    })
})

module.exports = router;