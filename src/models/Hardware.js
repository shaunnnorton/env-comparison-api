import mongoose from "mongoose"
const Schema = mongoose.Schema

const HardwareSchema = new Schema({
    createdAt: {type: Date},
    updatedAt: {type: Date},
    type: { type: String, required:true},
    name: { type: String, required: true},
    specs: { type: String, required: true}
},
    {timestamps: {createdAt: 'created_at'}}
)

module.exports = mongoose.model("Hardware", HardwareSchema)