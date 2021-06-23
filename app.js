const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const apiRouter = require('./routes');
app.use('/api', apiRouter);

//listen on environment port ot 5000
app.listen(port,()=> console.log('listening on port ' + port));