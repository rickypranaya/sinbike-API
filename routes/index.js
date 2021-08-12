const express = require("express");
const exphbs = require("express-handlebars");
const stripe = require('stripe')('sk_test_51JKRCrH2sQlhwz6CXS6tcWQOr2Ojeqf64zffjLqcGtBG81JKpDBxtRD8OZb5MJUiwuxHsMcKnkpqf4apF2XNs8vH00E2siZUOD')
const db = require("../db")
const router = express.Router();

router.post("/payment_checkout", async (req,res, next)=>{
    const total = req.body.total;
    const token = req.body.token;
    
    stripe.charges.create({
        amount: total,
        currency: 'sgd',
        source: token
    }).then(charge => {
        res.status(200).send(charge);
    }).catch(e => console.log(e));

});

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

router.post("/bike_add", async (req,res, next)=>{
    const params = req.body;

    try{
        let results = await db.bike_add(params);
        res.json({
            data : results
        });

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

router.post("/bike_delete", async (req,res, next)=>{
    const params = req.body;

    try{
        let results = await db.bike_delete(params);
        res.json({
            data : results
        });

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

router.post("/update_user", async (req,res, next)=>{
    const params = req.body;

    try{
        let results = await db.update_user(params);
        res.json({
            data : results
        });

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

router.post("/bike_suspend", async (req,res, next)=>{
    const params = req.body;

    try{
        let results = await db.bike_suspend(params);
        res.json({
            data : results
        });

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});


router.post("/update_balance", async (req,res, next)=>{
    const params = req.body;

    try{
        let results = await db.update_balance(params);
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
        let check = await db.get_reserve(params);
        
        if  (!check.length){
            let results = await db.reserve(params);
            res.json({
                status: 200,
                message: 'success',
                data : results
            });
    
        } else {
            res.json({
                status : 400,
                message:'You can only reserve one bike at a time',
                data : results
            });
        }
        
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
        let results = await db.bikes();

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

router.post("/get_reserve", async (req,res, next)=>{
    const params = req.body;

    try{
        let results = await db.get_reserve(params);

        if (!results.length){
            res.json({
                status : 400,
                message : 'reservation is not found',
            });
        } else {

            res.json({
                status : 200,
                data : results,
                message : 'reservation retrieve success'
            });
        }
        
    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

router.post("/bike_one", async (req,res, next)=>{
    const params = req.body;

    try{
        let results = await db.bike_one(params);

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

router.post("/reserve_one", async (req,res, next)=>{
    const params = req.body;

    try{
        let results = await db.reserve_one(params);

        if (!results.length){
            res.json({
                status : 400,
                message : 'reservation is not found',
            });
        } else {

            res.json({
                status : 200,
                data : results,
                message : 'reservation retrieve success'
            });
        }
        
    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

router.post("/reviews", async (req,res, next)=>{

    try{
        let results = await db.reviews();

        if (!results.length){
            res.json({
                status : 400,
                message : 'bike is not found',
            });
        } else {
            for (let x of results) {
                let getUser = await db.users_one(Number(x.user_id))
                let name = getUser.first_name +' '+ getUser.last_name;
                Object.assign(x, {full_name: name})
              }

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


router.post("/reports", async (req,res, next)=>{

    try{
        let results = await db.reports();

        if (!results.length){
            res.json({
                status : 400,
                message : 'report is not found',
            });
        } else {
            for (let x of results) {
                let getBike = await db.bikes_one(x.bike_id)
                let status = getBike.status;
                Object.assign(x, {status: status})
              }

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