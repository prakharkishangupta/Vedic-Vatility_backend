const express = require('express');
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "PrakharCanDoAnything"

// Route 1
router.post('/createUser', 
    [body('name', 'Not a valid name').isLength({min:3}),
    body('email', 'Not a valid email').isEmail(),
    body('password', 'Not a valid password').isLength({min:3})],
    async (req, res)=>{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let success = false;
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "email already exists."})
        }
        const salt = bcrypt.genSaltSync(10);
        const secPass = bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        success = true
        const data = {
            user:{id:user.id}
        }
        console.log(data.user.id);
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({success, authToken})
        // res.send(user)
    }catch(error){
        res.status(500).json({error:"Some error occured"})
    }
})

// Route 2
router.post('/login', 
    [body('email', 'Not a valid email').isEmail(),
    body('password', 'Not a valid password').isLength({min:3})],
    async (req, res)=>{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let success = false;
        let user = await User.findOne({email: req.body.email});
        console.log(user);
        if(!user){
            return res.status(400).json({error: "Invalid credentials"})
        }
        
        const comparePass = await bcrypt.compare(req.body.password, user.password);
        if(!comparePass){
            return res.status(400).json({error: "Invalid credentials"})
        }
        success=true;
        const data = {
            user:{id:user.id}
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({success, authToken})
        // res.send(user)
    }catch(error){
        res.status(500).json({error:"Some error occured"})
    }
    
})

// ROUTE 3: Get loogedIn user details using "/api/auth/getUser"
router.post("/getUser", fetchUser, async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  });

module.exports = router;