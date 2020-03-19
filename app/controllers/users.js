'use strict'
const express = require('express')
const router = express.Router()
const userdata = require('../models/userModel')
const { Validator } = require('node-input-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const routeProtect = require('../../config/auth.js')

router.post('/signup', async (req, res, next) => {
    const validateUserData = new Validator(req.body, {
        FirstName: 'required|alpha',
        LastName: 'required|alpha',
        Email: 'required|email',
        Password: 'required|alphaNumeric'
    });
    let matched = await validateUserData.check()
    console.log(matched)
    if (!matched) {
        console.log('not matched')
        next(validateUserData.errors)
    } else {
        const password = await bcrypt.hash(req.body.Password, 10)
        userdata.createTodoUser(req.body, password, (err, result) => {
            if (err) {
                next(err)
            } else {
                return res.status(201).json({ "message": "User Created" })
            }
        })
    }
})

router.post('/signin', (req, res, next) => {
    userdata.getUserDataEmail(JSON.stringify(req.body.Email), async (err, userData) => {
        if (err || userData.length == 0) {
            const errmessage = new Error('Please Check Your EmailID or Password')
            next(errmessage)
        } else {
            const generatetoken = await jwt.sign({ Id: userData[0].Id }, 'myPrivateKey')
            console.log('generated token  ', generatetoken)
            let comparePassword = await bcrypt.compareSync(req.body.Password, userData[0].Password)
            const decode = await jwt.verify(generatetoken, 'myPrivateKey')

            if (comparePassword == true && decode.Id == userData[0].Id) {
                return res.status(200).send({ "message": "User Data Match and Logged In Successfully", "token": generatetoken })
            } else {
                const errmessage = new Error('Incorrect Password, try again')
                next(errmessage)
            }
        }
    })
})

router.get('/', async (req, res, next) => {
    userdata.getUserData((err, result) => {
        if (err || result.length == 0) {
            const errmessage = new Error('No data found')
            next(errmessage)
        }else{
            return res.status(200).send({ "message": result })
        }
    })
})

router.get('/:userId', routeProtect, async (req, res, next) => {
    userdata.getUserDataById(req.params.userId, (err, result) => {
        if (err || result.length == 0) {
            const errmessage = new Error('No data found')
            next(errmessage)
        }else{
            return res.status(200).send({ "message": result })
        } 
    })
})

//UPDATING USER DATA
router.patch('/:userId', routeProtect, async (req, res, next) => {
    userdata.updateUserData(req.body, req.params.userId, (err, result) => {
        if (err || result.length == 0) {
            const errmessage = new Error('No data found')
            next(errmessage)
        }else{
            return res.status(200).send({ "message": "user data updated successfully" })
        }
    })
})

router.delete('/:userId', routeProtect, async (req, res, next) => {
    userdata.deleteUser(req.params.userId, (err, result) => {
        if (err || result.length == 0) {
            const errmessage = new Error('No data found')
            next(errmessage)
        }else{
            return res.status(200).send({ "message": result })
        }
    })
})

module.exports = router;