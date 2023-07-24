const pool = require('./db');
const bcrypt = require('bcrypt');

module.exports.isEmailExists = async (email) => {
    try{
        let query = "SELECT * FROM users WHERE email = $1;";
        let {rows} = await pool.query(query,[email]);
        if(rows.length > 0) return true;
        return false;
    }catch(err){
        throw new Error(err);
    }
}

module.exports.varifyUser = async (email,password) => {
    try{
        let query = "SELECT * FROM users WHERE email = $1";
        let {rows} = await pool.query(query,[email]);
        if(rows.length > 0){
            let flag = await bcrypt.compare(password,rows[0].password);
            if(flag)
                return rows[0];
            else
                return [];
        };
        return [];
    }catch(err){
        throw new Error(err);
    }
}

module.exports.newUser = async (userData) => {
    try{
        let query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`;
        let values = [userData.name, userData.email, userData.password];
        await pool.query(query, values);
        return true;
    }catch(err){
       throw new Error(err);
    }
}



