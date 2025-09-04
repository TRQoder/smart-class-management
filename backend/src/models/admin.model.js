const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({

})

const adminModel = mongoose.model("Admin", adminSchema);
module.exports = adminModel;