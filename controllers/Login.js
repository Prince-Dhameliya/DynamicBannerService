const {connection} = require('../config/connectDB.js')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');
const Users = require('../models/users.js');

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const user = await Users.findOne({ where: { email: email } });
    if(!user) return res.sendStatus(401);


    const {password} = user.dataValues;
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
        return res.json({ email, accessToken, roles });
    } else {
        return res.sendStatus(401);
    }
}

module.exports = { handleLogin };