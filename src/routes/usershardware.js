import { Router } from "express"
import bcrypt from "bcryptjs"
import User from "./../models/User"


const authUser = (req, res, next) => {
    User.findOne({ "username": req.params.username }).select("password")
        .then(password => {
            return bcrypt.compare(req.body.DATA.userpassword, password.password)
        })
        .then(isMatch => {
            if (isMatch === true) {
                next()
            }
            else {
                res.status(400).send({ "ERROR": "Passoword Error" })
            }
        })
        .catch(error => {
            console.log(error)
        })

}

const router = Router()

router.get("/:username/hardware", (req,res) => {
    User.findOne({username:req.params.username}).lean().populate('hardware')
        .then(result => {
            let response = {
                'user':result.username,
                "hardware":result.hardware
            }
            console.log(response)
            res.send(response)
        })
        .catch(err=>{
            console.log(err)
        })
})





export default router