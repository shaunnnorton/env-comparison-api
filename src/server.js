import express from "express"


const app = express()




app.get("/",(req,res) => {
    return res.send("TEST")
})





const port = 7689

app.listen(port, () => {
    console.log("API listening on port 7689")
})


module.exports = app