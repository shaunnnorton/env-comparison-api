import mongoose from "mongoose"
import assert from "assert"

const url = "mongodb://localhost/env-api"

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
mongoose.set("debug", true)

module.exports = mongoose.connection