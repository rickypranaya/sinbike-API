const express = require("express");
const exphbs = require("express-handlebars");
const stripe = require('stripe')('sk_test_51JKRCrH2sQlhwz6CXS6tcWQOr2Ojeqf64zffjLqcGtBG81JKpDBxtRD8OZb5MJUiwuxHsMcKnkpqf4apF2XNs8vH00E2siZUOD')
const db = require("../db")
const router = express.Router();
var moment = require('moment');


//twillio
const accountSid = 'AC28b6a086a95aa3d81f7b0d2f45cef8d9';
const authToken = '4235ecb8db4c2bfaf50d1453cc27e84c';
const client = require('twilio')(accountSid, authToken);


router.post("/send_otp", async (req,res, next)=>{
    const params = req.body;

    var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    client.messages
    .create({
        body: 'Your Sinbike OTP is '+otp,
        from: '+15053226608',
        to: params.phone
    })
    .then(message => res.status(200).send(otp)).catch(e => res.status(500).send(e));
});

router.post("/payment_checkout", async (req,res, next)=>{
    const total = req.body.total;
    const token = req.body.token;
    const params = req.body;
    
    stripe.charges.create({
        amount: total,
        currency: 'sgd',
        source: token
    }).then(charge => {
        // res.status(200).send(charge);
        try{
            getTransaction(params)
            res.status(200).send(charge)
        } catch (e){
            res.status(500).send(charge)
        }
    }).catch(e => console.log(e));
});

const getTransaction = async (params)=>{
    try{
        let results = await db.transaction_add(params);       
        console.log(results)
    }catch(e){
        console.log(e)
    }
}

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

router.post("/reserve_delete", async (req,res, next)=>{
    const params = req.body;

    try{
        let results = await db.reserve_delete(params);
        res.json({
            status:200,
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

            try{
                let results = await db.reserve(params);
                res.json({
                    status: 200,
                    message: 'success',
                    data : results
                });
            } catch (e) {
                res.status(600).send(e)
            }
        
        } else {
            res.json({
                status : 400,
                message:'You can only reserve one bike at a time',
            });
        }
        
    }catch(e){
        console.log(e)
        res.status(500).send(e)
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
        res.status(500).send(e);
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

router.post("/transaction", async (req,res, next)=>{
    const params = req.body;

    try{
        let results = await db.transaction(params);

        if (!results.length){
            res.json({
                status : 400,
                message : 'transaction is not found',
            });
        } else {

            res.json({
                status : 200,
                data : results,
                message : 'transaction retrieve success'
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
                message : 'reservation expired'
            });
        }
        
    }catch(e){
        console.log(e)
        res.status(503).send(e);
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
            var resultData = results[0]
            try{
                let bikeData = await db.bike_one(resultData);
                Object.assign(resultData, {location: bikeData[0]})

                res.json({
                    status: 200,
                    message: 'success',
                    data : resultData
                });

            } catch (e) {
                res.status(600).send(e)
            }
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