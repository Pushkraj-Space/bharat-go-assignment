const jwt = require('jsonwebtoken');
const pool = require('./models/db');

const authToken = async (req, res, next) => {
    const auth_header = req.headers.authorization;
    let token = auth_header && auth_header.split(' ')[1];
    if(token == null) return res.status(401).json({msg : "User not logged in"});
    
    let query =  `SELECT * FROM blacktoken WHERE token = $1`;
    let {rows}  = await pool.query(query,[token]);
    if(rows.length > 0){
        return res.status(401).json({msg : "User not logged in"})
    }
    jwt.verify(token , process.env.TOKEN_SECRET, (err, user) =>{
        if(err) return res.status(403).json({msg : "Forbidden : User not logged in"});
        req.user = {...user};
        return next();
    })
}

module.exports = authToken;