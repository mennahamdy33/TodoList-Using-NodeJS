const express = require('express');
const app = express();
const port = 3000;
const todoRouter = require('./todos/todoRouter');
require('./dbConnection');

app.use(express.json());

app.use(express.static('public', { 
    index: 'base.html'
}));

app.use(['/todos','/todo'],todoRouter);

app.use((err, req, res, next)=>{
  if(!err.status){
    err.message = "something went wrong";
    console.log(err);
    // send mails
    // log to logging server
}
res.status(err.status || 500).send({ message: err.message});
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});