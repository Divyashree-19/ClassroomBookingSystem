import express from "express";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";

const router = express.Router();

// Search classroom by name
router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "Please provide a room name" });
    }

    const room = await Room.findOne({ name: new RegExp(`^${name}$`, "i") });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Get today's bookings for this room
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookings = await Booking.find({
      roomId: room._id,
      date: { $gte: today }
    });

    return res.json({
      room,
      bookings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
