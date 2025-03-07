const JewelleryModel = require("../model/jewelModels");

const addJewellery = async (req, res) => {
    try {
        const { name, description, category, subcategory, size, gender, price } = req.body;

        const image = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };

        const jewel = new JewelleryModel({
            name,
            description,
            category,
            subcategory,
            size,
            gender,
            price,
            image
        });

        await jewel.save();

        res.status(200).json({ success: true, message: "Jewellery added successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add jewellery", error: error.message });
    }
};

const getJewellery = async (req, res) => {
    try {
        const jewellery = await JewelleryModel.find();
        const jewelsWithImages = jewellery.map(jewel => ({
            _id: jewel._id,
            name: jewel.name,
            description: jewel.description,
            price: jewel.price,
            category: jewel.category,
            subcategory: jewel.subcategory,
            gender: jewel.gender,
            size: jewel.size,
            image: jewel.image?.data
                ? `data:${jewel.image.contentType};base64,${jewel.image.data.toString('base64')}`
                : null
        }));
        res.json(jewelsWithImages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch jewellery' });
    }
};

const removeJewellery = async (req, res) => {
    console.log("Received body:", req.body); 
    const { id } = req.body;


    try {
        const result = await JewelleryModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ success: false, message: "Jewellery item not found" });
        }

        res.status(200).json({ success: true, message: "Jewellery item removed successfully" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to remove jewellery",
            error: error.message
        });
    }
};

module.exports = {
    addJewellery,
    getJewellery,
    removeJewellery
};
