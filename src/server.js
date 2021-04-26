import express from "express"
import handlebars from "express-handlebars"


const app = express()



app.engine('handlebars', handlebars({defaultLayout:"main"}))

app.get("/",(req,res) => {
    return res.send("TEST")
})





const port = 7689

app.listen(port, () => {
    console.log("API listening on port 7689")
})


module.exports = app