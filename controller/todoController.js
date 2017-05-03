var bodyParser = require('body-parser');

var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://test:test@ds117849.mlab.com:17849/todo');

//create scheme
var todoschema = new mongoose.Schema({
   item: String 
});

var Todo = mongoose.model('Todo', todoschema);


//var data = [{item: 'eat'},{item: 'kick some coding ass'},{item: 'sleep'}];

var urlencoderParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){
    
    app.get('/todo',function(req,res){
        //get data from mongodb and pass it to view
        Todo.find({},function(err, data){
           if(err) throw err;
            res.render('todo',{todo: data});
        });
    });
    
    app.post('/todo',urlencoderParser,function(req,res){
        //get data from the view and add it to mangodb
        var newTodoItem = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        }) ;       
    });
    
    app.delete('/todo/:item',function(req,res){
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/ /g,"-")}).remove(function(err){
            if(err) throw err;
            res.json(data);
        });
    });
    
};