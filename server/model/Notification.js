import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  post: {
    type: String,
  },
  postedBy: {
    type: String,
  },
});

const Notification = mongoose.model("notification", NotificationSchema);
export default Notification;