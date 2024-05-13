const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const PreData = require("../Models/PreData")
const { body, validationResult } = require("express-validator");

router.post('/addPreData', [
    body('problem').isLength({min:1}),
    body('age').isLength({min:1}),
    body('level').isLength({min:1}),
    body('recImage'),
    body('imageDesc'),
    body('desc'),
    body('vedio'),
    body('courseVedio'),
    body('courseDesc'),
    body('vedioDesc'),
],async(req, res)=>{
    try{
        const{ problem, age, level, recImage, imageDesc, desc, vedio, courseVedio, courseDesc, vedioDesc} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const preData = new PreData({problem, age, level, recImage, imageDesc, desc, vedio, courseVedio, courseDesc, vedioDesc});
        const savedPreData = await preData.save();
        console.log(savedPreData.problem);
        res.send(savedPreData);
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
})

module.exports = router;