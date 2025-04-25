//server.js:
console.clear();
const WebSocket = require('ws');
const {v4:uuidv4}=require('uuid'); // benzersiz user id ler için

const wsServer=new WebSocket.Server({port:3001})

const wsClients=[];

wsServer.on('connection',(socket)=>{

    socket.id=uuidv4();
    wsClients.push(socket.id)
 
    console.log("biri geldi:", socket.id);
    
    //socket.send('Hoşgeldin');

    socket.on('message',(message)=>{
        console.log('gelen mesaj:',message.toString());
        console.log(wsClients.length," kişi var");

        wsServer.clients.forEach(client=>{
            if( client!==socket &&   client.readyState===WebSocket.OPEN){
                client.send(message.toString())
            }
        })
    })
    socket.on('close',(socket)=>{
        console.log("biri gitti")
        const index= wsClients.indexOf(socket.id);
        if(index!==-1) wsClients.splice(index,1)
    })
    
});



