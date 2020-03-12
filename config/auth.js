const jwt = require('jsonwebtoken')
const userdata = require('../app/models/userModel')
/**
 * This Code will Authenticate user to create,update,delete todo as per user
 * get the userdata 
 * update and delete the user data.
 */
module.exports =  (req, res, next)=>{
    userdata.getUserDataById(req.params.userId,async (err,userData)=>{
        try{
            console.log(userData)
            const token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token, 'myPrivateKey')
            console.log(' jwt token result ', decode)
            if(decode.Id == userData[0].Id){
               return next()
            }else{
               return res.status(401).send({"message":"Unauthorized"})
            }
        }catch(err){
            return res.status(401).send({"message":"Unauthorized, Please attach your token with this API"})
        }
    
    })
}