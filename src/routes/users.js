import { Router } from "express"

import User from "./../models/User"


const router = Router()

router.get("/", (req,res) => {
    User.estimatedDocumentCount().then((count) => {
        let toSkip = Math.floor(Math.random() * count-req.query.amount)
        console.log(req.query)
        return User.find({}).limit(Number(req.query.amount)).skip(toSkip).lean().populate()
    })
    .then(result => {
        res.send({Users:result})
    })
})


export default router