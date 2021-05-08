import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import assert from "assert"



console.log(process.env.DatabaseUrl)
const url = process.env.DatabaseUrl

mongoose.Promise = global.Promise
mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false},
    function(err, db) {
        assert.strictEqual(null, err)
        console.log("connected to DB")
    }
)

mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"))
mongoose.set("debug", false)

module.exports = mongoose.connection