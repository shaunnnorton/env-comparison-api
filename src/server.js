import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { readyState } from "./data/env-api-db"
import routes from "./routes/index"


const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/users',routes.users)
app.use("/users", routes.usersHardware)
app.use('/users',routes.usersSoftware)
app.use("/hardware",routes.hardware)
app.use("/software",routes.software)

app.get("/", (req,res) => {
    res.redirect('https://shaunnnorton.github.io/env-comparison-api/#/')
})



const port = process.env.PORT

app.listen(port, () => {
    console.log("API listening on port 7689")
})


module.exports = app