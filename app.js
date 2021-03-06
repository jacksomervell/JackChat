var express = require('express');
var app = express()
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
  res.render('index');
});

  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
    console.log('user disconnected');
    });
  });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});