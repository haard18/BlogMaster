const express = require('express');
const userRouter = express();
const Users = require('../Models/Users');
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middlewares/fetchuser');

const jwtsec = 'shhhhh'
// Onboard a user
userRouter.post('/signup', [
    body('username', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        // Check if user with the same email already exists
        let existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        let newUser = new Users({
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();
        const id = newUser._id;
        const token = jwt.sign({ id }, jwtsec)

        res.json({token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

userRouter.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 3 })
] ,async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {email , password} = req.body;
    const existingUser=await Users.findOne({
        email:email
    })
    if(!existingUser){
        return res.status(404).json({msg:"Not found please signup"})
    }
    const isMatched = bcrypt.compare(password,existingUser.password);
    if(!isMatched){
        return res.status(411).json({msg : "Invalid Credentials"})
    }
    const id = existingUser._id;
    const token = jwt.sign({id},jwtsec);
    return res.json({token});
});
userRouter.put('/updateProfile',async(req,res)=>{
    const {email,newPassword}=req.body;
    if(!email || !newPassword){
        return res.status(500)
    }
    const existingUser=await Users.findOne({email});
    if(!existingUser){
        return res.status(404)
    }
    const salt = await bcrypt.genSalt(10);
    const newhashPassword=await bcrypt.hash(newPassword,salt);
    const update = await Users.updateOne(
        { email: email },
        { $set: { password: newhashPassword } }
    );
    res.status(200).json({ message: 'Password updated successfully' });
})

//Routes for PROFILE Management

module.exports = userRouter;
