const pool = require('./db');

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

module.exports.getAllUsers = async () => {
    try{
        let query = `SELECT * FROM users`
        let {rows} = await pool.query(query);
        return rows;
    }catch(err){
        throw new Error(err);
    }
}

module.exports.getUserById = async (id) => {
    try{
        let query = `SELECT * FROM users WHERE id = $1`;
        let {rows} = await pool.query(query,[id]);
        if(rows.length > 0 )
            return rows[0];
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

module.exports.updateUser = async (userData) => {
    try{
        let {name,id} = userData;
        let query = "UPDATE users SET name = $1 WHERE id = $2;"
        let values = [name,id];
        await pool.query(query,values);
        return true;
    }catch(err){
        throw new Error(err);
    }
}

module.exports.deleteUser = async (id,token) => {
    try{
        let query = "INSERT INTO blacktoken (token) VALUES ($1);";
        await pool.query(query,[token]);
        query = "DELETE FROM users WHERE id = $1;";
        await pool.query(query,[id]);
        return true;
    }catch(err){
        throw new Error(err);
    }
}