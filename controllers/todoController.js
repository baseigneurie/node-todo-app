var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var es6Promise = require('es6-promise');
mongoose.Promise = es6Promise.Promise;

//Connect to mongodb
mongoose.connect('mongodb://XXXX/todo')

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {

app.get('/todo', (req, res) => {
    //get data from DB
    Todo.find({}, (err, data) => {
        if (err) throw err;
        res.render('todo', {todos: data});
    });
});

app.post('/todo', urlencodedParser, (req, res) => {
    //get and add too db data
    var newTodo = Todo(req.body).save((err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item', (req, res) => {
    //delete the requested item
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

};
