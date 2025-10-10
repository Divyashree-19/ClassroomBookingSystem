import express from "express";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import User from "../models/User.js";

import { protect,verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("room").populate("bookedBy", "name email");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// Create a booking with conflict check
router.post("/", protect, async (req, res) => { 
  try {
    const { roomId, date, startTime, endTime } = req.body;
    const userId = req.user.id;

    if (!roomId || !date || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check for time conflicts
    const conflict = await Booking.findOne({
      room: roomId,
      date,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime },
        }, // overlapping
      ],
    });

    if (conflict) {
      return res
        .status(400)
        .json({ message: "Room is already booked for this time" });
    }

    // Create booking
    const booking = new Booking({
    user: req.user._id, 
      room: roomId,
      date,
      startTime,
      endTime,
      bookedBy: userId,
    });

    await booking.save();
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Booking failed" });
  }
});

// GET /api/bookings/mybookings
router.get("/mybookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("room", "name");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE /api/bookings/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    await booking.remove();
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});







// Get all bookings (admin)

router.get("/all", protect, verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("room")
      .populate("bookedBy", "username email");

    const now = new Date();
    const formatted = bookings.map(b => ({
      _id: b._id,
      room: b.room?.name || "N/A",
      date: b.date,
      startTime: b.startTime,
      endTime: b.endTime,
      bookedBy: b.bookedBy ? `${b.bookedBy.username} (${b.bookedBy.email})` : "Unknown",
      status:
        new Date(b.date) > now
          ? "Upcoming"
          : new Date(`${b.date} ${b.endTime}`) < now
          ? "Finished"
          : "Ongoing"
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});


export default router;
