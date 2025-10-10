import express from "express";
import { addRoom, getAllRooms, updateRoom, deleteRoom } from "../controllers/roomController.js";
import { protect, verifyAdmin } from "../middleware/authMiddleware.js";
//import Booking from "../models/Booking.js";
//const Booking = require("../models/Booking");
import Room from "../models/Room.js";


const router = express.Router();

router.get("/", protect, getAllRooms);
router.post("/", protect, verifyAdmin, addRoom);
router.put("/:id", protect, verifyAdmin, updateRoom);
router.delete("/:id", protect, verifyAdmin, deleteRoom);
router.get("/available", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
});

// backend/routes/roomRoutes.js

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
});





export default router;



