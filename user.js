const express = require("express")

const app = express();

require('./Connection/connection')
const userSchema = require('./Schema/userSchema')
const { verifyToken, validateUser } = require('./middleware/auth')

const bodyParser = require("body-parser"); 
app.use(bodyParser.json()); 

const cookieParser = require("cookie-parser");
app.use(cookieParser())

const bcrypt = require('bcryptjs');
require('dotenv').config();

const Port = process.env.port || 5000;

const jwt = require('jsonwebtoken');
const sec_key = process.env.SECRET_KEY;

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {

        const findUser = await userSchema.findOne({ email })
        if (findUser) {
            const isPasswordValid = await bcrypt.compare(password, findUser.password);
            if (isPasswordValid) {
                const payload = { id: findUser._id  , email: findUser.email /* , password : findUser.password */};
                const token = jwt.sign(payload,sec_key, { expiresIn: "60s" });
                res.status(200).json({ message: 'login successful', token });
            } else {
                res.status(401).json({ message: 'invalid email/password' });
            }
        } else {
            res.status(404).json({ message: 'user not found' });
        }

    } catch (error) {
        console.log(error);
    }

})

app.post('/register', validateUser, async(req,res) => {
    try {
        const {username, email, password} = req.body;

        const existedUser = await userSchema.findOne({email});
        if(existedUser){
            return res.status(401).json({message : "User already Existed"});
        } else{
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await userSchema.create({
                username,
                email,
                password : hashedPassword
            });
            res.status(200).send(user);
        }

    } catch (error) {
        console.log(error);
    }
})

app.get('/userprofile', (req,res) => {
    res.send("UnProtected Routes");
})

app.put('/userprofile',verifyToken, (req,res) => {
    res.send("Protected Routes");
})

app.listen(Port, () => {
    console.log(`Server is running on Port ${Port}`)
})
