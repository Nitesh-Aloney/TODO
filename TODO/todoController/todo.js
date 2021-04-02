module.exports = function(app){

const mongo = require('mongoose');
mongo.connect('mongodb+srv://nitesh:todoPass@cluster0.0zo8l.mongodb.net/MyTodo?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
mongo.connection.on('error', (err)=>console.log(err.message));

const todoSchema = new mongo.Schema({
    item: String,
    date: String,
    desc: String
});

const Todo = mongo.model('Todo', todoSchema);

const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended:false});

app.get('/todo/', function(req, res){
    
    Todo.find({},(err, data)=>{
        if(err) throw err;
        res.render('index', {todos : data});
    });
    
});

app.post('/todo/', urlEncodedParser, function(req, res){
    var item = Todo(req.body).save((err,data)=>{
        if(err) throw err;
        console.log(data);
        res.json(data);
    });
});

app.delete('/todo/:item', function(req, res){
    Todo.find({item: req.params.item.replace(/\-/g,' ')}).remove((err, data)=>{
        if(err) throw err;
        res.json(data);
    })
});

}