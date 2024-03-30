/* eslint-disable no-undef */
// SubpostitsController.js

const { Subpostits } = require("../models/ModelSchema");
const createSubpostit = async (req, res) => {
  try {
    const newSubpostit = new Subpostits(req.body);
    await newSubpostit.save();
    res.status(201).json(newSubpostit);
  } catch (error) {
    if(error.code === 11000){
      res.status(406).json({
        message: "Duplicate Name"
    })
    }else{
      res.status(400).json({ message: error.message });
    }
  }
};

const updateSubpostit = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSubpostit = await Subpostits.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedSubpostit) {
      return res.status(404).json({ message: "Subpostit not found" });
    }
    res.json(updatedSubpostit);
  } catch (error) {
    if(error.code === 11000){
      res.status(406).json({
        message: "Duplicate Name"
    })
    }else{
      res.status(400).json({ message: error.message });
    }
  }
};

const deleteSubpostit = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubpostit = await Subpostits.findByIdAndDelete(id);
    if (!deletedSubpostit) {
      return res.status(404).json({ message: "Subpostit not found" });
    }
    res.json({ message: "Subpostit deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSubpostitById = async (req, res) => {
  try {
    const { id } = req.params;
    const subpostit = await Subpostits.findById(id);
    if (!subpostit) {
      return res.status(404).json({ message: "Subpostit not found" });
    }
    res.json(subpostit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSubpostits = async (req, res) => {
  try {
    const subpostits = await Subpostits.find();
    res.json(subpostits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubpostit,
  updateSubpostit,
  deleteSubpostit,
  getSubpostitById,
  getSubpostits,
};
