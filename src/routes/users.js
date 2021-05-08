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
                res.status(403).send({ "ERROR": "Passoword Error" })
            }
        })
        .catch(error => {
            console.log(error)
        })

}




const router = Router()

router.get("/", (req, res) => {
    User.estimatedDocumentCount().then((count) => {
        let toSkip = Math.abs(Math.floor(Math.random() * count - req.query.amount))
        //console.log(req.query)
        return User.find({}).limit(Number(req.query.amount)).skip(toSkip).lean().populate()
    })
        .then(result => {
            let response = {
                Response:"Success",
                DATA:{users:result}
            }
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

router.get("/:username", (req, res) => {
    User.findOne({ 'username': req.params.username }).lean().then(user => {
        //console.log(user)
        //console.log(req.params.username)
        let response = {
            Response:"Success",
            DATA:{user:user}
        }
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

router.post("/:username", (req, res) => {
    let new_user = new User({ "username": req.params.username, "password": req.body.DATA.password })
    new_user.save()
        .then(res => {
            return User.findOne(new_user).lean()
        })
        .then(user => {
            let response = {
                Response:"Success",
                DATA:{user:user}
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

router.put("/:username", authUser, (req, res) => {
    let Changes = req.body.DATA.Changes
    User.findOneAndUpdate(
        { "username": req.params.username },
        Changes,
        { returnNewDocument: true }
    )
        .then(user => {
            let response = {
                Response:"Success",
                DATA:{user:user}
            }
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

router.delete("/:username", authUser,(req,res) => {
    User.findOneAndDelete({username:req.params.username})
        .then(user => {
            let response = {
                Response:"Success",
                DATA:{user:user}
            }
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

router.get("/compare")


export default router