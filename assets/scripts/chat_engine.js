console.log("chat engine this is working");
    // sending the request
class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        // io given to us by scokent.io cdn
        this.socket = io.connect('http://localhost:5000/');
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;
        // this will have interactions b/w observer and subscriver/
        this.socket.on('connect',function(){
            console.log('connection established using sockets...! ')
            
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'wixy'

            });
            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
            });
            $("button",self.chatBox).click(()=>{
                const input = $('input',self.chatBox);
                let msg = input.val();
                console.log('box clicked',msg);
                input.val("");
                if(msg){
                    self.socket.emit('wixy',{
                        user_email:self.userEmail,
                        msg:msg
                    })
                    $("#msg-container",self.chatBox).append(`<p class="fromUserMsg msg">${msg}</p>`)
                }
            })
            self.socket.on('wixy',function(data){
                console.log("message recieved to user",data);
                if(self.userEmail!=data.user_email){
                    $('#msg-container',self.chatBox).append(`<p class="toUserMsg msg">${data.msg}</p>`)
                }
            })

       
        })
    }
}