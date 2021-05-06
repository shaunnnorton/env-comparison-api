import { Router } from "express"
import bcrypt from "bcryptjs"
import User from "./../models/User"
import Software from "./../models/Software"


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

router.get("/:username/software", (req, res) => {
    User.findOne({ username: req.params.username }).lean().populate('software')
        .then(result => {
            let response = {
                Response:"Success",
                DATA:{'user': result.username,
                    "software": result.software}
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

router.post("/:username/software", authUser, (req, res) => {
    User.findOne({ username: req.params.username }).populate('software')
        .then(user => {
            //console.log(user)
            let Software_data = req.body.DATA.software
            //console.log(Hardware_data)
            let newSoftware = new Software(Software_data)
            user.software.push(newSoftware)
            newSoftware.save()
                .then((result) => {
                    //console.log(result,user)
                    let response = {
                        Response:"Success",
                        DATA:{'user': user.username,
                            "software": user.software}
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

router.put("/:username/software", authUser, (req, res) => {
    Software.findOneAndUpdate(
        req.body.DATA.software,
        req.body.DATA.Changes,
        { new: true })
        .then(document => {
            let response = {
                Response:"Success",
                DATA:{'user': req.params.username,
                    "software": document}
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


router.delete("/:username/software", authUser, (req, res) => {
    //console.log(req.body.DATA.hardware.name)
    Software.findOneAndDelete(req.body.DATA.software)
        .then(doc => {
            let response = {
                Response:"Success",
                DATA:{'user': req.params.username,
                    "software": doc}
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