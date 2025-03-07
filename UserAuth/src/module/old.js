const jewelleryModel = require("../model/jewelModels");

const addJewellery = async (req, res) => {
    console.log(JSON.stringify(req.body));
    const { name, description, category, subcategory, size, gender, price } = req.body;
    try {
        const newJewellery = new jewelleryModel({
            name,
            description,
            category,
            subcategory,
            size,
            gender,
            price,
        });

        await newJewellery.save();
        res.status(201).json({ success: true, message: "Jewellery added successfully", newJewellery });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { addJewellery };
