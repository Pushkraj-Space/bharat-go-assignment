const Auth = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 1. *POST /auth/register*: Register a new user.
module.exports.newUser = async (req, res) => {
    try{
        const {name,email,password} = req.body;
        if(!name || name.trim() == ""){
            return res.status(400).json({msg : "Name can't be empty"});
        }else if(!password || password.trim() == ""){
            return res.status(400).json({msg : "Password can't be empty"});
        }else if(isEmailValid(email) == false){
            return res.status(422).json({msg : "Enter valid email format"});
        }
        if(await Auth.isEmailExists(email) == true){
            return res.status(409).json({msg : "Email already exists, try with different email"});
        }
        const userData = {
            ...req.body,
            password : await bcrypt.hash(req.body.password, 12)
        }
        const userCreated = await Auth.newUser(userData);
        res.status(201).json({userCreated});
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"})
    }
}

// 2. *POST /auth/login*: Authenticate and generate a JWT token for the user.
module.exports.loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const userData = await Auth.varifyUser(email,password);
        if(userData.length == 0){
            return res.status(401).json({msg : "Email(username) and password does not match"});
        }
        delete userData.password;
        let id = userData.id;
        let accessToken = jwt.sign({...userData} , process.env.TOKEN_SECRET,{})
        return res.status(200).json({id,accessToken});
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"});
    }
}