import { response, Router } from "express"
import bcrypt from "bcryptjs"
import User from "./../models/User"
import Hardware from "./../models/Hardware"


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
                res.status(403).send({ "ERROR": "Passoword Error" })
            }
        })
        .catch(error => {
            console.log(error)
        })

}

const router = Router()

router.get("/:username/hardware", (req, res) => {
    User.findOne({ username: req.params.username }).lean().populate('hardware')
        .then(result => {
            let response = {
                Response:"Success",
                DATA:{'user': result.username,
                    "hardware": result.hardware}
            }
            //console.log(response)
            res.send(response)
        })
        .catch(err => {
            let response = {
                Response:ERROR,
                DATA:{err}
            }
            res.status(400).send(response)
        })
})

router.post("/:username/hardware", authUser, (req, res) => {
    User.findOne({ username: req.params.username }).populate('hardware')
        .then(user => {
            //console.log(user)
            let Hardware_data = req.body.DATA.hardware
            //console.log(Hardware_data)
            let newHardware = new Hardware(Hardware_data)
            user.hardware.push(newHardware)
            newHardware.save()
                .then((result) => {
                    //console.log(result,user)
                    let response = {
                        Response:"Success",
                        DATA:{'user': user.username,
                            "hardware": user.hardware}
                    }
                    res.status(201).send(response)
                })
                .catch(err => {
                    let response = {
                        Response:ERROR,
                        DATA:{err}
                    }
                    res.status(400).send(response)
                })
        })
        .catch(err => {
            let response = {
                Response:ERROR,
                DATA:{err}
            }
            res.status(400).send(response)
        })

})

router.put("/:username/hardware", authUser, (req, res) => {
    Hardware.findOneAndUpdate(
        req.body.DATA.Hardware,
        req.body.DATA.Changes,
        { new: true })
        .then(document => {
            let response = {
                Response:"Success",
                DATA:{'user': req.params.username,
                    "hardware": document}
            }
            //console.log(response)
            res.send(response)
        })
        .catch(err => {
            let response = {
                Response:ERROR,
                DATA:{err}
            }
            res.status(400).send(response)
        })

})


router.delete("/:username/hardware", authUser, (req, res) => {
    //console.log(req.body.DATA.hardware.name)
    Hardware.findOneAndDelete(req.body.DATA.hardware)
        .then(doc => {
            let response = {
                Response:"Success",
                DATA:{'user': req.params.username,
                    "hardware": doc}
            }
            //console.log(response)
            res.send(response)
        })
        .catch(err => {
            let response = {
                Response:ERROR,
                DATA:{err}
            }
            res.status(400).send(response)
        })
})



export default router