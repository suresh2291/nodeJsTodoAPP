'use strict'
var express = require('express')
var router = express.Router() 
var todo = require('../models/todo')
const { Validator } = require('node-input-validator')
const routeProtect = require('../../config/auth.js')
router.post('/createTodo/:userId', routeProtect, async(req,res,next)=>{
    const validateTodoData = new Validator(req.body, {
        title:'required',
        description:'required'
    });
    let matched = await validateTodoData.check()
    console.log(matched)
    if (!matched) {
        return res.status(400).send(validateTodoData.errors)
      }else{
        todo.getTodoByUserId(req.params.userId,(err,userData)=>{ 
        //console.log(userData.length)
            if(userData.length==0){
                todo.insertTodo(req.body,req.params.userId, (err,result)=>{
                    if(err){
                     return res.status(500).send({"message":err.sqlMessage})//send({err.sqlMessage})
                    }else if(res.statusCode == 200){
                     return res.status(201).send({"message":"Created"})
                    }else{
                     return res.status(400).send({"message":"Bad Request"})
                    }
                })
            }else{
                return res.status(400).send({"message":"duplicate entry data"}) 
            }
               
    })
    }
})
router.get('/getAllTodos', (req, res) => {
    todo.getAllTodo((err, result) => {
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

router.get('/getTodosByUserId/:userId',routeProtect, (req, res) => {
    todo.getTodoByUserId(req.params.userId,(err,result)=>{
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
router.patch('/updateTodo/:userId', routeProtect,  (req, res) => {
    todo.updateTodo(req.body,req.params.userId,(err,result)=>{
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

router.delete('/deleteTodo/:Id/:userId', routeProtect, (req, res) => {
    todo.deletetodo(req.params.Id,(err,result)=>{
        if(err){
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