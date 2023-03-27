// notification.service.js
import {Server} from 'socket.io';

class NotificationService {
  constructor(httpServer) {
    this.io = new Server(httpServer,{
      cors:{
        origin:"http://192.168.0.9:3001",
        methods:['GET','POST']
      }
    });
    this.io.on('connection', socket => {
      console.log('User connected');
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }

  sendNotification(data) {
    this.io.emit('notification', data);
  }
}

export default NotificationService;

