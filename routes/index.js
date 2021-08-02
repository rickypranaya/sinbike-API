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

router.post("/reserve", async (req,res, next)=>{
    const params = req.body;

    try{
        let results = await db.reserve(params);
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
    let results;

    try{
        if ( !isNaN(params.username)){
            results = await db.login_phone(params);
        } else {
            results = await db.login_email(params);
        }

        if (!results.length){
            res.json({
                status : 400,
                message : 'user is not found',
            });
        } else {

            res.json({
                status : 200,
                data : results,
                message : 'login success'
            });
        }
        
    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

router.post("/bike", async (req,res, next)=>{

    try{
        results = await db.bikes();

        if (!results.length){
            res.json({
                status : 400,
                message : 'bike is not found',
            });
        } else {

            res.json({
                status : 200,
                data : results,
                message : 'bike retrieve success'
            });
        }
        
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
        res.send('hesuerp rld!');

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});


module.exports = router;