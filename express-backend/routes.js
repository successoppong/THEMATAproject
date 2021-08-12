const express = require('express');


const router = express.Router();
const usermodel = require('./usermodel')
const casemodel = require('./casemodel');
const threadmodel = require('./threadmodel');
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
        response.status(200).send({success:true, message:"Login Successful", id: responseData['_id'], role: responseData['role']})
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

    
    try {

        let newCase = new casemodel({title: title, counseleeid: counseleeid,counselerid:"", casedate:new Date().toDateString(), status:'Not Responded', thread:[]});
    
        let newCaseResponseData =  await newCase.save()

        let newThread = new threadmodel({caseid: newCaseResponseData['_id'], message: description, counseleeid: counseleeid,counselerid:"", threaddate:new Date().toLocaleDateString(), status:''});
        
        let newThreadResponseData = await newThread.save();


    } catch (error) {
        response.status(400).send({error:true, message: error});   
    }
    
    response.status(200).send({success:true, message:`You have successfully added your case. A counsellor will be assigned to you soon.`})
})

router.post('/addthread', async (request,response) => {
    const { description, counseleeid, caseid, counselorid } = request.body

    
    try {

        let newThread = new threadmodel({caseid: caseid, message: description, counseleeid: counseleeid,counselerid:counselorid, threaddate:new Date().toLocaleDateString(), status:''});
        
        let newThreadResponseData = await newThread.save();


    } catch (error) {
        response.status(400).send({error:true, message: error});   
    }
    
    response.status(200).send({success:true, message:`You have successfully saved your reply.`})
})


router.post("/listcases", async (request,response) => {
    const { counseleeid } = request.body

    let casesData = await casemodel.find({ counseleeid: counseleeid })
    
    if(casesData.length > 0){
        for(let i=0;i<casesData.length;i++){
            let responseThread = await threadmodel.find({ caseid: casesData[i]['_id'] })
            casesData[i]['thread'] = JSON.stringify(responseThread)
        }
        response.status(200).send({success:true, data: casesData})
    } else {
        response.status(400).send({error: true, message:"No cases were found for you. Create one"})
    }

})


router.post("/listthreads", async (request,response) => {
    const { caseid } = request.body

    let threads = await threadmodel.find({ caseid: caseid })
    
    if(threads.length > 0){

        response.status(200).send({success:true, data: threads})
    } else {
        response.status(400).send({error: true, message:"No threads were found for your case. Add one"})
    }

})


module.exports = router