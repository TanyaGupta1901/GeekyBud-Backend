const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const router = express.Router();
const key = process.env.JWT_SECRET;
const middleware = require('../middleware/')
function validatePassword(password) {

    //  At least 1 alphabet
    // At least 1 digit
    // Contains no space
    // Optional special characters e.g. @$!%*#?&^_-
    // Minimum 8 characters long


    const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/
    return regexPassword.test(password);
}

function validateEmail(email) {
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return regexEmail.test(email);
}

router.use(require('express-session')({
    secret: "Secret isn't meant to be told",
    resave: false,
    saveUninitialized: false,
    cookie : { secret : true }
}));

router.get('/signin', (req,res)=>{
    res.send("signin page");
})

router.post('/Signin', (req,res)=>{
   
    const {name,email,skillset,password,cpassword,twitter,github,portfolio,linkedin,city,organization,designation,img,bio} = req.body;

    if(!name || !email || !password || !cpassword )
    res.status(422).json({error : "Please fill all the fields"});
    else if(!validateEmail(email))
    res.status(400).json( {error :"Invalid Email"});
    else if(password != cpassword)
    res.status(400).json({error : "Password does not match"});
    else if(!validatePassword(password))
    res.status(400).json({error :"Invalid password"});
    else
    {
        User.findOne({email : email})
        .then((user) =>{
            console.log(user);
            if(user != null){
                res.status(400).json({error : "User exists"});
            }
            else{
                
            bcrypt.hash(password, 10).then((hashedP) =>{

                User.create({name,email,skillset,password : hashedP,twitter,github,portfolio,linkedin,city,organization,designation,img,posts : [],bio}, (err, user) =>{

                    if(err){
                        console.log(err);
                        res.status(400).json({error : "error occured in user creation"});
                    }
                    else{
                        console.log(user);
                        const token = jwt.sign({_id : user._id},key)
                        res.status(200).json({token,user})
                    }
                })
            }).catch((err) =>{
                console.log(err)
                res.status(400).json({error : "error occured in password creation"});
            })
            }
        })
    }

})

router.get('/login', (req,res)=>{
    res.send("login page");
})

router.post('/login', (req,res)=>{
    
    var {email , password} = req.body;

    console.log(req.body);
    if(!email || !password){
      res.status(422).json({error : "Incomplete data"});
    }
    else{
       User.findOne({email : email})
       .then((user) => {
           if(!user){
               res.status(422).json({error : "Invalid data"})
           }
           else
           {
               bcrypt.compare(password, user.password)
               .then((matched) =>{
                   if(matched){
                       const token = jwt.sign({_id : user._id},key)
                       res.status(200).json({token,user})
                    //    res.status(200).json({message : "Signed in"})
                   }
                   else
                   {
                       res.status(422).json({error : "Invalid credentials"})
                   }
               })
               .catch((err) =>{
                   console.log(err);
               })
           }
       }) 
    }
})

router.get("/viewProfile/:userId",(req,res)=>{

    User.findById(req.params.userId, (err, user) =>{

        if(err)
        res.status(400).json({error : err})
        else
        res.status(200).json({user})
    })

})

router.post('/logout', (req,res)=>{
    res.send("logout page");
})



module.exports = router;