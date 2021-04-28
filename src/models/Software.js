import mongoose from "mongoose"
const Schema = mongoose.Schema

const SoftwareSchema = new Schema({
    createdAt: {type: Date},
    updatedAt: {type: Date},
    type: { type: String, required:true},
    name: { type: String, required: true},
    version: { type: String, required: true}
},
    {timestamps: {createdAt: 'created_at'}}
)

module.exports = mongoose.model("Software", SoftwareSchema)