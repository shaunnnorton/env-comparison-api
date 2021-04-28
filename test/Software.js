import app from "./../src/server.js"
import chai from "chai"
import chaiHttp from "chai-http"

const should = chai.should()
const expect = chai.expect

//import Software from "./../src/models/Software"

chai.use(chaiHttp)

describe("Software Routes", ()=>{
    const agent = chai.request.agent(app)
    const sampleSoftware = {
        type:"OS",
        name:"Mac OS",
        version:"11.3"
    }
    beforeEach((done) => {
        //Create sampleSoftware
        done()
    })

    afterEach((done) => {
        //Remove sampleSoftware
        done()
    })

    it("Should return a list of software with type OS", (done)=> {
        agent
            .get("/software")
            .send("amount=3&type=OS")
            .end((err,res)=>{
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.include("software")
                done()
            })
    })
})