const express = require("express");
const db = require("../db")
const routerWeb= express.Router();

routerWeb.get("/",(req,res, next)=>{

    try{
        // res.json({
        //     data : 'hi'
        // });
        res.send('this is web!');

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});


module.exports = routerWeb;