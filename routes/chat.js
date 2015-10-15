module.exports = function(router,io) {

    var uuid = require('uuid');
    var moment = require('moment');

    io.on('connection', function(socket){
        console.log('a user connected');

        socket.on('disconnect', function(){
            console.log('user disconnected');
            io.sockets.in(socket.room).emit('chat', socket.username + ' left!', "Server");
        });

        // socket.on('chat', function(msg){
        //     console.log('message: ' + msg);
        //     io.emit('chat', msg);
        // });

        socket.on('chat', function (data) {
            console.log('message: ' + data);
            io.sockets.in(socket.room).emit('chat', data, socket.username, socket.image, moment().format('llll'));
        });

        socket.on('joinroom', function(room_id, username){
            socket.room = room_id;
            socket.username = username;
            socket.image = 'http://lorempixel.com/64/64/?id='+uuid.v4();
            socket.join(room_id);
            console.log(username + ' added to ' + room_id);
            io.sockets.in(socket.room).emit('chat', username + ' joined!', "Server");
            // io.emit('chat', msg);
        });

    });

    /* GET users listing. */
    router.get('/chat/:id', function(req, res, next) {
        var id = req.params.id;
        res.render('chatroom', { room_id: id });
    });


}
