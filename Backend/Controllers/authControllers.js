const users = require('../db');
const JWT_SECRET = "helloWorld";
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const path = require('path');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            return res.status(409).json({ message: "User already exists", success: false });
        }

        const newUser = { id: uuidv4(), first_name, last_name, email, password };
        users.push(newUser);
        console.log(newUser);
        const dbPath = path.join(__dirname, '../db.js');
        const updatedContent = `let users = ${JSON.stringify(users, null, 2)};\n\nmodule.exports = users;\n`;
        await fs.writeFile(dbPath, updatedContent);

        res.status(201).json({ message: "Sign-up successful", success: true });
    } catch (err) {
        console.error("Error during sign-up:", err);
        res.status(500).json({ message: "Sign-up failed", success: false });
    }
};

const login = async (req, res) => {
    try {   
        const {email, password} = req.body;
        const idx = users.findIndex(user => user.email == email);
        
        if (idx === -1) {
            return res.status(403).json({success: false, message: "Invalid email or password"});
        }

        const isPasswordEqual = users[idx].password == password;

        if (!isPasswordEqual) {
            return res.status(403).json({success: false, message: "Invalid email or password"});
        }

        const jwtToken = jwt.sign(
            {email: users[idx].email, _id: users[idx].id},
            JWT_SECRET,
            {expiresIn: '24h'}
        );

        return res.status(200).json({success: true, message: "Login successful", jwtToken, email, name: users[idx].first_name});
    } catch(err) {
        return res.status(500).json({success: false, message: "Login failed"});
    }
}


module.exports = {login,signUp};
