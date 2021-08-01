const express = require("express");
const exphbs = require("express-handlebars");
const db = require("../db")
const router = express.Router();


router.post("/users_add", async (req,res, next)=>{
    const params = req.body;

    try{
        let results = await db.users_add(params);
        res.json({
            data : results
        });

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

router.post("/login", async (req,res, next)=>{
    const params = req.body;

    try{
        let results = await db.login_phone(params);
        res.json({
            data : results
        });

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});


router.get("/",(req,res, next)=>{

    try{
        // res.json({
        //     data : 'hi'
        // });
        res.send('hesup rld!');

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});


module.exports = router;