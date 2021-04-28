import app from "./../src/server.js"
import chai from "chai"
import chaiHttp from "chai-http"

const should = chai.should()
const expect = chai.expect

//import Hardware from "./../src/models/Hardware"

chai.use(chaiHttp)

describe("Hardware Routes", ()=>{
    const agent = chai.request.agent(app)
    const sampleHardware = {
        type:"Computer",
        name:"MacBookPro",
        specs:"13in 2017 3.1Ghz 8GBRAM"
    }
    beforeEach((done) => {
        //Create sampleHardware
        done()
    })

    afterEach((done) => {
        //Remove sampleHardware
        done()
    })

    it("Should return a list of hardware with type", (done)=> {
        agent
            .get("/hardware")
            .send("amount=3&type=Computer")
            .end((err,res)=>{
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.include("hardware")
                done()
            })
    })
})