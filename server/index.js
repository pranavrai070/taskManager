import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from "http";
import { Server } from 'socket.io';
import multer from 'multer';
// import NotificationService from './services/Notification.js';





import Connection from './database/db.js';
import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/user.js';
// import { Server } from 'socket.io';


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
      origin: 'http://192.168.0.9:3001',
      methods: ['GET', 'POST']
  }
});

// const notificationService =  new NotificationService(httpServer);
// notificationService.sendNotification("data");
// console.log(notificationService);




app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ 
 limit: '50mb',
  parameterLimit: 100000,
  extended: true }));
// app.use(forms.array());

app.use(cors());



app.use('/tasks', taskRoutes);
app.use('/user',userRoutes);


const PORT = 8000;

Connection();


httpServer.listen(PORT, () => console.log(`Your server is running successfully on PORT ${PORT}`));


io.on('connection', socket => {
  console.log("user connected")
  socket.on('check', async data => {
      socket.emit('load-document', data);

      socket.on('send-changes', data => {
          socket.broadcast.emit('receive-changes', data);
      })

      socket.on('save-document', async data => {
          console.log("inside last socket");
          console.log(data);
      })
  })
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

