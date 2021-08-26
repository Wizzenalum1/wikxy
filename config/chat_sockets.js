

module.exports.chatSockets= function(SocketServer){
    let io = require('socket.io')(SocketServer);
    let chatrooms = [];
    io.sockets.on('connection',function(socket){
        console.log('new connection reciverd',socket.id)
        socket.on('disconnect',function(){
            console.log('socket disconnected');
        });
        socket.on('join_room',function(data){
            console.log('joinig requere rec',data);

            socket.join(data.chatroom);
            
            chatrooms.push(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        })
        socket.on(chatrooms[0],function(data){
            console.log("at server meassage",data)
            io.emit(chatrooms[0],data);
        })
        


    });
}