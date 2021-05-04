import express from "express"
import { readyState } from "./data/env-api-db"
import routes from "./routes/index"

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/users',routes.users)
app.use("/users", routes.usersHardware)





const port = 7689

app.listen(port, () => {
    console.log("API listening on port 7689")
})


module.exports = app