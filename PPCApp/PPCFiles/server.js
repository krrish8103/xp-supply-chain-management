var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var sql = require("mssql");

// config for your database
var config = {
    user: 'sa',
    password: '23Hammer',
    server: 'SRI-I7-DC',
    database: 'SCM',
    port: 1433
};

//var users = [];
var users = [
                { name: "Bob", type: "man" },
                { name: "Charlie", type: "man" },
                { name: "Dave", type: "man" }
];
var message = 'this is from socket';
app.use(express.static(path.join(__dirname, 'public')));

var productId = 0; 
io.on('connection', function (socket) {
    message = 'connection - Socket connected successfully';
  console.log('a user connected');
    //Connections
  socket.on('get-users', function () {
      //message = 'get-users - Socket connected successfully';
      //socket.emit('all-users', users);
      
      productId = 1;
      // connect to your database

      sql.connect(config, function (err) {
          console.log('hi');
          if (err) console.log(err);
          setInterval(function () {
              DBCall();
              //DBCallForPump();
          }, 2000);
          // create Request object
         
      });
      //
  });
  sql.close();

  function DBCall() {
      var request = new sql.Request();

      //request.input('lngProductId', sql.Int, 1 );
      request.execute('spGetData').then(function (recordsets) {
          console.log(recordsets);
          socket.send(recordsets);
      }).catch(function (err) {
          console.log(err);
      });
  }

    
  function DBCallForPump() {
      var request = new sql.Request();

      // query to the database and get the records
      request.query('Select * from tblMachineLog', function (err, recordset) {

          if (err) console.log(err)

          // send records as a response
          console.log(recordset);
          socket.send(recordset);
         

      });
  }



  //new user
  socket.on('join', function(data){
      console.log(data);
      console.log(users);
      //User name
      socket.nickname = data.nickname;
      users[socket.nickname] = socket; 
      var userObj = {
        nickname: data.nickname,
        socketid: socket.id
    };

    users.push(userObj);
    io.emit('all-users', users);
  });

  socket.on('send-message', function(data) {
      //socket.broadcast.emit('message-received', data);
      io.emit('message-received', data);
  });

  socket.on('send-like', function(data){
      console.log(data);
      socket.broadcast.to(data.like).emit('user-liked',data);
  });

 socket.on('disconnect', function(){
    // console.log('user disconnected', function() {
        users = users.filter(function(item) {
            return item.nickname !== socket.nickname;
        });
        io.emit('all-users', users);
  });

});

server.listen(3000, function() {
    console.log('all is good');
});
