const express = require('express');


const router = express.Router();
const usermodel = require('./usermodel')
const casemodel = require('./casemodel');
const generateSecret = require('./util')



router.get('/', function(request, response){
    response.status(200).send("hello home")
})


router.post("/login", async (request,response) => {
    const { email, password } = request.body
    // console.log(email);
    let responseData = await usermodel.findOne({email})
    console.log(responseData);
    if(responseData){
        if(password === responseData.password){
            response.status(200).send({message:"Successful"})
        } else {
            response.status(200).send({message:"wrong username or password"})
        }
    } else {

        response.status(400).send({message:"User does not exist"})
    }
})

router.post('/signup', async (request,response) => {
    const { firstname, lastname, email,password } = request.body

    const responseData = {};
    try {
        let newuser = new usermodel({firstname, lastname, email, password})
    
         responseData =  await newuser.save()
    } catch (error) {
        response.status(400).send({message:error})
        
    }
    
    response.status(200).send({message:"you have successfully signed up. You can login now!!!", data: responseData})

})


router.post("/counseleesignin", async (request,response) => {
    const { password } = request.body
    
    let responseData = await usermodel.findOne({ password: password })

    if(responseData){
        response.status(200).send({success:true, message:"Login Successful", id: responseData['_id']})
    } else {

        response.status(400).send({message:"User does not exist"})
    }

})

router.post('/counseleesignup', async (request,response) => {
    let responseData = {};
    let secret = generateSecret(10);
    try {

        let newuser = new usermodel({firstname:'', lastname:'', email:'', password:secret, role:'counselee'})
    
         responseData =  await newuser.save()
    } catch (error) {
        response.status(400).send({error:true, message: error})
        
    }
    
    response.status(200).send({success:true, message:`Please copy the secret key and keep it safe. 
                                                      You will need it each time you come to this platform. 
                                                      Once you misplce the secret key, it will be impossible 
                                                      for you to retrieve. Your Secret Key is :: ${secret}`})

})

router.post('/addcase', async (request,response) => {
    const { title, description, counseleeid } = request.body

    let responseData = {};
    try {

        let newcase = new casemodel({title: title, description: description, counseleeid: counseleeid,counselerid:"", casedate:new Date().toDateString(), status:'Not Responded'})
    
         responseData =  await newcase.save()
    } catch (error) {
        response.status(400).send({error:true, message: error});   
    }
    
    response.status(200).send({success:true, message:`You have successfully added your case. A counsellor will be assigned to you soon.`})
})


router.post("/listcases", async (request,response) => {
    const { counseleeid } = request.body

    let responseData = await casemodel.find({ counseleeid: counseleeid })

    if(responseData.length > 0){
        response.status(200).send({success:true, data: responseData})
    } else {
        response.status(400).send({error: true, message:"No cases were found for you. Create one"})
    }

})


module.exports = router