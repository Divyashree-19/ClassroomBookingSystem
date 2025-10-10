import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Room name must be unique
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  resources: {
    type: [String], // Example: ["Projector", "Whiteboard"]
    default: []
  },
  description: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

export default mongoose.model("Room", roomSchema);
