import jewelModel from "../models/jewelModels.js";
import fs from "fs";

// Add jewel item
const addjewel = async (req, res) => {
  try {

    const image = req.file;  // Multer processes images under req.file
    if (!image) {
        return res.status(400).json({
            success: false,
            message: "Image not found",
        });
    }
    
    // Validate required fields
    const { name, description, price, category, subcategory, gender, size } = req.body;
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, description, price, or category",
      });
    }

    // Create jewel object with optional image
    const jewelData = {
      name,
      description,
      price,
      category,
      subcategory,
      gender,
      size,
      image
    };

    if (req.image) {
      const image_filename = `/uploads/${req.image.filename}`;
      jewelData.image = image_filename; 
    }

    // Create a new jewel document
    const jewel = new jewelModel(jewelData);

    // Save to the database
    await jewel.save();

    res.status(201).json({ success: true, message: "Product added successfully", data: jewel });
  } catch (error) {
    console.error("Error adding jewel:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export { addjewel };