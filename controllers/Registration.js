const bcrypt = require('bcrypt');
const {connection} = require('../config/connectDB.js');
const Users = require('../models/users.js');

const handleNewUser = async (req, res) => {
    let {
        email,
        pwd: password,
    } = req.body;
    try {
        if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
        const user = await Users.findOne({ where: { email: email } });
        if(user) return res.sendStatus(401);
        const hashedPwd = await bcrypt.hash(password, 10);
        let userData = {
            email,
            password: hashedPwd,
        };
        await Users.create(userData);
        return res.status(201).json({ 'success': `New user ${email} created!` });
    } catch (err) {
        return res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };