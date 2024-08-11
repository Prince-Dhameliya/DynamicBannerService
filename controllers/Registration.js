const bcrypt = require('bcrypt');
const {connection} = require('../config/connectDB.js')

const handleNewUser = async (req, res) => {
    let {
        email,
        pwd: password,
    } = req.body;

    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    let sql = `SELECT id, password FROM users WHERE email = "${email}"`;
    try {
        connection.query(sql, async (err1, results1) => {
            if(err1) res.sendStatus(500);
            if(results1.length == 0) {
                const hashedPwd = await bcrypt.hash(password, 10);
                let users = {
                    email,
                    password: hashedPwd,
                };

                const tableName = 'users';
                const columns = Object.keys(users).join(', ');
                const values = Object.values(users).map(value => typeof value === 'string' ? `'${value}'` : value).join(', ');
                const insertUserQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
                connection.execute(insertUserQuery, async (err2, results2) => {
                    if(err2) return res.sendStatus(500);
                    return res.status(201).json({ 'success': `New user ${email} created!` });    
                })
            }
            else {
                return res.sendStatus(401); //Unauthorized 
            }
        });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };