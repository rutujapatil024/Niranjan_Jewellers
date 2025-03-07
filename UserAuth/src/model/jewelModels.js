const mongoose = require('mongoose');

const jewelSchema = new mongoose.Schema({
    name:{type:String},
    description: {type:String},
    price:{type:Number},
    image: {
        data: Buffer,
        contentType: String
     }, 
    category:{type:String},
    subcategory:{type:String},
    gender:{type:String},
    size:{type:String}
})

const jewelModel = mongoose.models.jewellery || mongoose.model('jewellery',jewelSchema)

module.exports = mongoose.model('JewelModel', jewelSchema);