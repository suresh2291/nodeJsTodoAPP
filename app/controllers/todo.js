'use strict'
var express = require('express')
var router = express.Router() 
var todo = require('../models/todo')
const { Validator } = require('node-input-validator')
const routeProtect = require('../../config/auth.js')
router.post('/addtodo/:userId', routeProtect, async(req,res,next)=>{
    const validateTodoData = new Validator(req.body, {
        title:'required',
        description:'required'
    });
    let matched = await validateTodoData.check()
    console.log(matched)
    if (!matched) {
        return res.status(400).send(validateTodoData.errors)
      }else{
        todo.getExistingTodoData(req.body.title,req.params.userId,(err,userData)=>{ 
        console.log(userData)
            if(userData[0].userCount==0){
                todo.insertTodo(req.body,req.params.userId, (err,result)=>{
                    if (err || result.length == 0) {
                        const errmessage = new Error('No data found')
                        next(errmessage)
                    }else{
                        return res.status(201).send({ "message": "Created" })
                    }
                })
            }else{
                const errmessage = new Error('data already exists')
                next(errmessage)
            }
               
    })
    }
})
router.get('/', (req, res, next) => {
    todo.getAllTodo((err, result) => {
        if (err || result.length == 0) {
            const errmessage = new Error('No data found')
            next(errmessage)
        }else{
            return res.status(200).send({ "message": result })
        }
    })
})

router.get('/:userId',routeProtect, (req, res, next) => {
    todo.getTodoByUserId(req.params.userId,(err,result)=>{
        if (err || result.length == 0) {
            const errmessage = new Error('No data found')
            next(errmessage)
        }else{
            return res.status(200).send({ "message": result })
        }
    })
})

//UPDATING USER DATA
router.patch('/:userId', routeProtect,  (req, res, next) => {
    todo.updateTodo(req.body,req.params.userId,(err,result)=>{
        if (err || result.length == 0) {
            const errmessage = new Error('No data found')
            next(errmessage)
        }else{
            return res.status(200).send({ "message": result })
        }
    })
})

router.delete('/:Id/:userId', routeProtect, (req, res, next) => {
    todo.deletetodo(req.params.Id,(err,result)=>{
        if (err || result.length == 0) {
            const errmessage = new Error('No data found')
            next(errmessage)
        }else{
            return res.status(200).send({ "message": result })
        }
    })
})


module.exports = router;  