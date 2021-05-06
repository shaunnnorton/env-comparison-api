import { Router } from 'express'
import Hardware from "./../models/Hardware"

const router = Router()

router.get("/", (req,res) => {
    Hardware.find({type:req.query.type}).limit(Number(req.query.amount)).lean()
        .then(found => {
            let response = {
                hardware:found
            }
            //console.log(response)
            res.send(response)
        })
        .catch(err => {
            console.log(err)
        })
})


export default router