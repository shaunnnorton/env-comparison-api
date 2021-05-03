import { Router } from "express"

import User from "./../models/User"


const router = Router()

router.get("/", (req,res) => {
    User.estimatedDocumentCount().then((count) => {
        let toSkip = Math.abs(Math.floor(Math.random() * count-req.query.amount))
        //console.log(req.query)
        return User.find({}).limit(Number(req.query.amount)).skip(toSkip).lean().populate()
    })
    .then(result => {
        res.send({Users:result})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get("/:username", (req,res) => {
    User.findOne({'username':req.params.username}).lean().then(user => {
        console.log(user)
        //console.log(req.params.username)
        res.send({"User":user})
    })
    .catch(err => {
        console.log(err)
    })
})

export default router