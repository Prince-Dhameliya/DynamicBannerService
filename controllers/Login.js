const {connection} = require('../config/connectDB.js')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    let sql = `SELECT id, password FROM users WHERE email = "${email}"`;

    connection.query(sql, async (err, results) => {
        if(err) res.sendStatus(500);
        if(results.length == 1) {
            const {id, password} = results[0];
            // evaluate password 
            const match = await bcrypt.compare(pwd, password);
            if (match) {
                // If roles are added to database then use data here
                const roles = [];
                // create JWTs
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "email": email,
                            "roles": roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1h' }
                );
                res.json({ email, accessToken, roles });
            } else {
                res.sendStatus(401);
            }
        }
        else {
            return res.sendStatus(401); //Unauthorized 
        }
    });
}

module.exports = { handleLogin };