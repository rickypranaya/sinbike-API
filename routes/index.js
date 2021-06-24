const express = require("express");
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

router.get("/",(req,res, next)=>{

    try{
        // res.json({
        //     data : 'hi'
        // });
        res.send('hello world!');

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

router.get("/tix-3",(req,res, next)=>{
    const params = req.body;

    try{
        // let results = await db.users_add(params);
         res.json({
             data : 'tix-3'
         });

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

module.exports = router;