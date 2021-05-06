import app from "./../src/server.js"
import chai from "chai"
import chaiHttp from "chai-http"

const should = chai.should()
const expect = chai.expect

import Software from "./../src/models/Software"

chai.use(chaiHttp)

describe("Software Routes", ()=>{
    const agent = chai.request.agent(app)
    const sampleSoftware = {
        type:"OS",
        name:"Fac OS",
        version:"11.3"
    }
    before((done) => {
        let newSoftware = new Software(sampleSoftware)
        newSoftware.save()
            .then(()=>{
                done()
            })
            .catch(err=> {
                err
            })
    })

    after((done) => {
        //Remove sampleSoftware
        Software.deleteMany({name:"Fac OS"})
            .then(res => {
                console.log(res)
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    it("Should return a list of software with type OS", (done)=> {
        agent
            .get("/software")
            .send("amount=3&type=OS")
            .end((err,res)=>{
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body.DATA).to.have.property("software")
                done()
            })
    })
})