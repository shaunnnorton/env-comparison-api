import app from "./../src/server.js"
import chai from "chai"
import chaiHttp from "chai-http"

const should = chai.should()
const expect = chai.expect

import Hardware from "./../src/models/Hardware"

chai.use(chaiHttp)

describe("Hardware Routes", ()=>{
    const agent = chai.request.agent(app)
    const sampleHardware = {
        type:"Computer",
        name:"SuperPowerfullComp",
        specs:"13in 2017 3.1Ghz 8GBRAM"
    }
    before((done) => {
        let newHardware = new Hardware(sampleHardware)
        newHardware.save()
            .then(messsage => {
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    afterEach((done) => {
        Hardware.deleteMany({name:"SuperPowerfullComp"})
            .then(res => {
                console.log(res)
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    it("Should return a list of hardware with type", (done)=> {
        agent
            .get("/hardware/?amount=3&type=Computer")
            .end((err,res)=>{
                if(err) throw err.message
                expect(res).to.have.status(200)
                //console.log(res)
                expect(res.body.DATA).to.have.property("hardware")
                done()
            })
    })
})