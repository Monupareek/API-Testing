const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();
const sec_key = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing.' });
    }
    try {
        const decoded = jwt.verify(token, sec_key);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(12).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
})

const validateUser = (req, res, next) => { 
    const { error } = userSchema.validate(req.body); 
    if (error) { 
        return res.status(400).send(error) ; 
    } 
    next();
};

module.exports = { verifyToken , validateUser };