// // ------------------- this is client side ----------------//
// // here we will be working on only one socket

// class ChatEngine{

//     constructor(chatBoxId, userEmail) {

//         this.chatBox = $(`#${chatBoxId}`);
//         this.userEmail = userEmail;
//     }

//     // connection handler function to maintain a back and forth connection between observer and subscriber
//     connectionHandler(EndUserEmail, EndUserID){

//         let self = this;
//         // this i..connect function fires an event called 'connection' in chat_sockets.js file you can see that
//         self.socket = io.connect('localhost:5000', {transports: ['websocket'], polling: false});

//         // so basically ' when sockets will be connected then there will be a callback function'

//         this.socket.on('connect', function(){

//             console.log("Connection Established using sockets.....");


//             // emit and request to socket server
//             self.socket.emit('private_message', {

//                 user_email: self.userEmail,
//                 chatRoom: EndUserEmail

//             });

//             // now when the above emit request will be listened to server
//             // we have to take action here to display it to user
//             self.socket.on('user_joined', function(frontUser){
//                 console.log(`${frontUser} has joined with ${EndUserEmail}`);
//             });

//         });

//         // ------------- On Send A Message Button -------------------- //

//         let chatInput = $('#message-content');
//         let sendButton = $('#send-btn');

//         sendButton.click(function(event){

//             event.preventDefault();

//             self.socket.emit('send_message', {

//                 message: chatInput.val(),
//                 user_email: self.userEmail,
//                 chatRoom: EndUserEmail

//             });

//         });

//         self.socket.on('receive_message', function(data){

//             let messageType = 'received';

//             // if the user email whichever's message is coming is mine then
//             if(data.user_email == self.userEmail){
//                 messageType = 'sent';
//             }

//             // create a new message div
//             let newMessageDiv = $('<div>');
//             newMessageDiv.addClass('message');

//             let newMessageContent = $('<span>').text(data.message);
//             newMessageContent.addClass(messageType);

//             newMessageDiv.append(newMessageContent);

//             $('#chatBoxId01').append(newMessageDiv);
            
//         });
//     }
// }

// // ----------------------- Display Chat When Clicked on friends name --------------------------- //

// $('#chatBoxID').hide();

// function displayChat(friend) {

//     let EnduserID = $(friend).attr('id');
//     let EndUserName = $(friend).attr('userName');
//     let EndUserProfile = $(friend).attr('userProfile');
//     let EndUserEmail = $(friend).attr('userEmail');

//     $('#chatBoxID').show();

//     $('#chat-user-dp').attr('src', EndUserProfile);
//     $('#chatUserName').html(EndUserName);

//     // now create a new ChatEngine object
//     let ceObj = new ChatEngine('chatBoxID', $('#chatBoxID').attr('email'));
//     ceObj.connectionHandler(EndUserEmail, EnduserID);
// }

// function closeChat(closeButton) {
//     $(closeButton).parent().parent().hide();
// }