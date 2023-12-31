const User = require("../models/userModel");
const bcrypt = require('bcrypt');
let isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(uuid);
}
module.exports.getAllUsers = async (req,res) => {
    try{
        let allUsers = await User.getAllUsers();
        res.status(200).json(allUsers);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports.getUserById = async (req, res) => {
    try{
        let {id} = req.params;
        if(isValidUUID(id) == false)
            return res.status(404).json({message : "User not found"});
        let userData = await User.getUserById(id);
        if(userData.length == 0)
            res.status(404).json({message : "User not found"});
        res.status(200).json(userData);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports.newUser = async (req, res) => {
    try{
        const {name,email,password} = req.body;
        if(!name || name.trim() == ""){
            return res.status(400).json({message : "Name can't be empty"});
        }else if(!password || password.trim() == ""){
            return res.status(400).json({message : "Password can't be empty"});
        }else if(isEmailValid(email) == false){
            return res.status(422).json({message : "Enter valid email format"});
        }
        if(await User.isEmailExists(email) == true){
            return res.status(409).json({message : "Email already exists, try with different email"});
        }
        const userData = {
            ...req.body,
            password : await bcrypt.hash(req.body.password, 12)
        }
        await User.newUser(userData);
        res.status(201).json({message : "User registration successful"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports.updateUser = async (req, res) => {
    try{
        let userData = {
            id : req.params.id,
            name : req.body.name
        }
        await User.updateUser(userData);
        res.status(200).json({message : "User updated successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports.deleteUser = async (req, res) => {
    try{
        const auth_header = req.headers.authorization;
        const token = auth_header && auth_header.split(' ')[1];
        let {id} = req.params;
        await User.deleteUser(id,token);
        res.status(200).json({message : "User deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
}