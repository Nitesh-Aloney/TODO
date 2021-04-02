const express = require('express');

const app = express();
const todo = require('./todoController/todo.js');
app.set('view engine', 'ejs');
app.use('/utilities', express.static('utilities'));

todo(app);

app.listen(3000, function(req, res){
    console.log("listening to 3000");
});