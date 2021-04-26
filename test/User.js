import app from "./../src/server.js"
import chai from "chai"
import chaiHttp from "chai-http"

const should = chai.should()
const expect = chai.expect

import User from "./../src/models/User"

chai.use(chaiHttp)

describe("Users Routes", () => {
    const agent = chai.request.agent(app)
    const sampleUser = {
        username:"testone",
        password:"password",
    }

    // beforeEach((done) => {
    //     const newUser = new User(sampleUser)
    //     newUser.save()
    //     done()
    // })

    it("Should return All Users in the database", (done) => {
        agent
            .get("/Users")
            .send({"start":1})
            .end((err,res) => {
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("Users")
                done()
            })
    })

    it("Should return user with the id provided", (done) => {
        agent
            .get("/Users/testone")
            .send()
            .end((err,res) => {
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("User")
                done()
            })
    })

    it("Should create user with the id and password provided", (done) => {
        agent
            .post("/Users/testtwo")
            .send({DATA:{password:"password"}})
            .end((err,res) => {
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("User")
                User.findOne({username:'testtwo'}).then((result)=>{
                    expect(result).to.be.an("Object")
                    done()

                })
            })
    })

    it("Should update user with the id and password provided", (done) => {
        agent
            .put("/Users/testone")
            .send({DATA:{password:"password",username:"testthree"}})
            .end((err,res) => {
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("User")
                User.findOne({username:'testthree'}).then((result)=>{
                    expect(result).to.be.an("Object")
                    return User.findOne({username:"testone"})
                })
                .then((r2)=>{
                    expect(r2).to.equal(null)
                    done()
                })
            })
    })

    
    it("Should remove user with the id and password provided", (done) => {
        agent
            .delete("/Users/testone")
            .send({DATA:{password:"password"}})
            .end((err,res) => {
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("User")
                User.findOne({username:'testone'}).then((result)=>{
                    expect(result).to.equal(null)
                    done()
                })

            })
    })

    it("Should return a users hardware", (done) => {
        agent
            .get("/Users/testone/hardware")
            .send()
            .end((err,res) => {
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("user")
                expect(res.body).to.have.property("hardware")
                done()
            })
    })

    it("Should add to a users hardware", (done) => {
        agent
            .post("/Users/testone/hardware")
            .send({type:"computer",name:"macbookpro",specs:"intel"})
            .end((err,res) => {
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("user")
                expect(res.body).to.have.property("hardware")
                expect(res.body.hardware).to.have.deep.property("type","computer")
                done()
            })
    })

    it("Should update a users hardware", (done) => {
        agent
            .put("/Users/testone/hardware")
            .send({type:"computer",name:"macbookpro",specs:"intel33"})
            .end((err,res) => {
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("user")
                expect(res.body).to.have.property("hardware")
                expect(res.body.hardware).to.have.deep.property("specs","intel33")
                done()
            })
    })
    

    it("Should delete from a users hardware", (done) => {
        agent
            .delete("/Users/testone/hardware")
            .send({type:"computer",name:"macbookpro",specs:"intel"})
            .end((err,res) => {
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("user")
                expect(res.body).to.have.property("hardware")
                expect(res.body.hardware).to.not.have.deep.property("type","computer")
                done()
            })
    })


    it("Should return a users software", (done) => {
        agent
            .get("/Users/testone/software")
            .send()
            .end((err,res) => {
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("user")
                expect(res.body).to.have.property("software")
                done()
            })
    })

    it("Should add to a users software", (done) => {
        agent
            .post("/Users/testone/software")
            .send({name:"MacOS",version:"Big Sur",type:"OS"})
            .end((err,res) => {
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("user")
                expect(res.body).to.have.property("software")
                expect(res.body.software).to.have.deep.property("type","OS")
                done()
            })
    })

    it("Should update a users software", (done) => {
        agent
            .put("/Users/testone/software")
            .send({name:"MacOS",version:"Big Sur",type:"OSx"})
            .end((err,res) => {
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("user")
                expect(res.body).to.have.property("software")
                expect(res.body.software).to.have.deep.property("type","OSx")
                done()
            })
    })
    

    it("Should delete from a users software", (done) => {
        agent
            .delete("/Users/testone/software")
            .send({name:"MacOS",version:"Big Sur",type:"OS"})
            .end((err,res) => {
                if(err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("user")
                expect(res.body).to.have.property("software")
                expect(res.body.software).to.not.have.deep.property("type","OS")
                done()
            })
    })



})