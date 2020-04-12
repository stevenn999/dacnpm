const express=require('express')
const router=express.Router();

const questions_module = require("../models/questions.model");

router.get("/", async (req, res) => {
    const questions = await questions_module.all();
    res.json(questions);
});


module.exports=router;