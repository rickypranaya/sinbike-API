const express = require("express");
const exphbs = require("express-handlebars");
const stripe = require('stripe')('sk_test_51JKRCrH2sQlhwz6CXS6tcWQOr2Ojeqf64zffjLqcGtBG81JKpDBxtRD8OZb5MJUiwuxHsMcKnkpqf4apF2XNs8vH00E2siZUOD')
const db = require("../db")
const router = express.Router();

const total = 5000;
    const token = 'wedf';
    const params = {id:'s'};
    
     stripe.charges.create({
        amount: total,
        currency: 'sgd',
        source: token
    }).then(charge => {
        // res.status(200).send(charge);
        other()
        
    }).catch(e => console.log(e));

    const other = async ()=>{
        try{
            let results = await db.transaction_add(params);
            console.log(results)
    
        }catch(e){
            console.log(e)
            res.sendStatus(500);
        }
    }