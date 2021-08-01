const { response } = require("express");
const express = require("express");
const app = express();
const expresshbs = require("express-handlebars");
const bodyParser = require("body-parser");
const messagebird = require("messagebird")("Nk4ILnnp16hGhxgfrzzxVr6ta");

const port = process.env.PORT || 5000;

app.engine("handlebars",expresshbs({defaultLayout:"main"}));
app.set("view engine","handlebars");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const apiRouter = require('./routes');
app.use('/api', apiRouter);

//TESTING
app.get('/',(req,res) => {
    res.render("step1")
});

app.post("/step2", (req,res) => {
    var number = req.body.number
    messagebird.verify.create(number,{
        template:"Your Verification code is %token"
    },function(err,response){
        if(err){
            console.log(err)
            res.render("step1",{
                error:err.errors[0].description
            })
        }
        else{
            console.log(response)
            res.render("step2",{
                id:response.id
            })
        }
    })
});

app.post("/step3",(req,res)=>{
    var id = req.body.id
    var token = req.body.token
    messagebird.verify.verify(id,token, (err,response)=>{
        if(err){
            res.render("step2", {
                error:err.errors[0].description,
                id:id
            })
        }
        else{
            res.render("step3")
        }
    })
});

//listen on environment port ot 5000
app.listen(port,()=> console.log('Listening on port ' + port));