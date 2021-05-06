import { Router } from 'express'
import Software from "./../models/Software"

const router = Router()

router.get("/", (req,res) => {
    Software.find({type:req.query.type}).limit(Number(req.query.amount)).lean()
        .then(found => {
            let response = {
                Response:"Success",
                DATA:{software:found}
            }
            //console.log(response)
            res.send(response)
        })
        .catch(err => {
            console.log(err)
        })
})


export default router