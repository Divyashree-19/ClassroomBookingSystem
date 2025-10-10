import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user:{type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true},
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cancelled: { type: Boolean, default: false }
});

export default mongoose.model("Booking", bookingSchema);
