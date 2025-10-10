import Room from "../models/Room.js";
export const addRoom = async (req, res) => {
  const { name, capacity, location, resources } = req.body;

  if (!name || !capacity || !location || !resources) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const room = new Room({ name, capacity, location, resources });
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
    console.log(rooms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rooms", error: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const r = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Updated", room: r });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
