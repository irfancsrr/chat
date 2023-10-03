const app=require("express")();
const http=require("http").Server(app);
const io=require("socket.io")(http);
 
app.get('/',(req,res)=>{
    res.sendFile('C:/Users/irfan/Desktop/first-app/second/index.html')
});
http.listen(8000,()=>{
    console.log("server built sucessfull....");
})
user={};
io.on("connection",(socket)=>{
    console.log("A user is connected..");
    socket.on('sendname',(data)=>{
           user[socket.id]=data;
      socket.broadcast.emit("resname",`<b>${user[socket.id]} :</b> this user connected`);
    }) 
    socket.on("sentmessage",(data)=>{
        socket.broadcast.emit('resname',`<b>${user[socket.id]} :</b> ${data}`);
        socket.emit('userview',`<b>You : </b>${data}`); 
    })
    socket.on("disconnect",()=>{
        console.log("user disconnected..");
        socket.broadcast.emit('resname',`<b>${user[socket.id]} :</b> disconnected..`); 
    })
})