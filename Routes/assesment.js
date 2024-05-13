const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const Assesment = require("../Models/Assesment")
const PreData = require("../Models/PreData")
const { body, validationResult } = require("express-validator");

//Route 2: Add the assesment input using "/api/assesment/addProblem". Login required
router.post(
    "/addProblem",
    [
      body("name", "Enter a valid title").isLength({ min: 3 }),
      body("phone", "Enter a valid description").isLength({ min: 10, max:10 }),
      body("age", "Enter a valid tag").isLength({ min: 3 }),
      body("gender", "Enter a valid tag").isLength({ min: 3 }),
      body("problem", "Enter a valid tag").isLength({ min: 3 }),
      body("sleep", "Enter a valid tag").isLength({ min: 1 }),
      body("level", "Enter a valid tag").isLength({ min: 3 }),
    ],
    fetchUser,
    async (req, res) => {
      
  
      try {
        let success = false;
        const { name, phone, age, gender, problem, sleep, level } = req.body;
        // If input conditions are not specified according to user.js
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const assesment = new Assesment({
          name,
          phone,
          age,
          gender,
          problem,
          sleep,
          level,
          user: req.user.id,
        });
        success = true;
        const savedAssesment = await assesment.save();
        console.log(savedAssesment);

        let pSol = await PreData.find({problem : savedAssesment.problem});
        console.log("psol: ", pSol);
        if(pSol){
            let aSol = await PreData.find({age: savedAssesment.age});
            console.log("asol: ", aSol);
            if(aSol){
                let lSol = await PreData.find({level: savedAssesment.level});
                let sol = lSol[0];
                console.log("sol: ", sol);
                res.json({success, savedAssesment, sol});
            }
        }
        
        

      } catch (error) {
        res.status(500).send({ error: "Internal server error" });
      }
    }
  );

  // Router 3  Get Recomendation
  router.get('/getRecomendation', fetchUser, async(req, res)=>{
    try {
        let userId = req.user.id;
        console.log(userId);
        let assesmentInput = await Assesment.find({user: userId});
        let assesment = assesmentInput[assesmentInput.length -1];
        console.log(assesment.problem);
        let pSol = await PreData.find({problem : assesment.problem});
        console.log(pSol);
        if(pSol){
            let aSol = await PreData.find({age: assesment.age});
            if(aSol){
                let lSol = await PreData.find({level: assesment.level});
                res.json(lSol[0]);
            }
        }
        
      } catch (error) {
        res.status(500).send({ error: "Internal server error" });
      }
  })

  module.exports = router;