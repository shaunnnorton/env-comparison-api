import app from "./../src/server.js"
import chai from "chai"
import chaiHttp from "chai-http"

const should = chai.should()
const expect = chai.expect

import User from "./../src/models/User"
import Hardware from "./../src/models/Hardware"
import Software from "./../src/models/Software"


chai.use(chaiHttp)

describe("Users Routes", () => {
    const agent = chai.request.agent(app)
    const sampleUser = {
        username: "testone",
        password: "password",
    }
    const sampleUser2 = {
        username: "testtwo",
        password: "password",
    }
    const sampleHardware = {
        type: "computer",
        name: "catdookdough",
        specs: "intel"
    }
    let newHardware = ''
    before(done => {
        newHardware = new Hardware(sampleHardware)
        newHardware.save()
            .then(()=>{
                done()
            })
            .catch(err => {
                done(err)
            })
    })


    beforeEach((done) => {
        const newUser = new User(sampleUser)
        newUser.hardware.push(newHardware)
        const newTwoser = new User(sampleUser2)
        newUser.save()
            .then((res) => {
                return newTwoser.save()
            })
            .then((result) => {
                done()
            })
            .catch(err => {
                done(err)
            })

    })

    afterEach((done) => {
        User.findOneAndDelete({ username: "testone" })
            .then((res) => {
                //console.log("Deleted TEMP user", res)
                return User.findOneAndDelete({ username: "testtwo" })
            })
            .then(rresult => {
                //.log(rresult)
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    after((done) => {
        User.deleteMany({
            username: {
                $in: [
                    "testone",
                    "testtwo",
                    "testthree"
                ]
            }
        })
            .then(res => {
                console.log(res)
                return Hardware.deleteMany({name: {$in:['catdookdough', "DustomNameTEST"]}})
            })
            .then(updated=>{
                console.log(updated)
                return Software.deleteMany({namd:{$in:['BACKOS']}})
            })
            .then(fin => {
                done()
            })
            .catch(err => {
                console.log(err)
                done(err)
            })
    })


    it("Should return All Users in the database", (done) => {
        agent
            .get("/Users/?amount=1")
            .end((err, res) => {
                if (err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body.DATA).to.have.property("users")
                done()
            })
    })

    it("Should return user with the id provided", (done) => {
        agent
            .get("/Users/testone")
            .send()
            .end((err, res) => {
                if (err) throw err.message
                //console.log(res)
                expect(res).to.have.status(200)
                expect(res.body.DATA).to.have.property("user")
                expect(res.body.Response).to.equal("Success")
                done()
            })
    })

    it("Should create user with the id and password provided", (done) => {
        agent
            .post("/Users/testtwo")
            .send({ DATA: { password: "password" } })
            .end((err, res) => {
                if (err) throw err.message
                expect(res).to.have.status(201)
                expect(res.body.DATA).to.have.property("user")
                User.findOne({ username: 'testtwo' }).then((result) => {
                    expect(result).to.be.an("Object")
                    done()

                })
            })
    })

    it("Should update user with the id and password provided", (done) => {
        agent
            .put("/Users/testone")
            .send({ DATA: { "userpassword": "password", "Changes": { username: "testthree" } } })
            .end((err, res) => {
                if (err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body.DATA).to.have.property("user")
                User.findOne({ username: 'testthree' }).then((result) => {
                    //console.log(result)
                    expect(result).to.be.an("Object")
                    return User.findOne({ username: "testone" })
                })
                    .then((r2) => {
                        expect(r2).to.equal(null)
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            })
    })


    it("Should remove user with the id and password provided", (done) => {
        agent
            .delete("/Users/testone")
            .send({ DATA: { userpassword: "password" } })
            .end((err, res) => {
                if (err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body.DATA).to.have.property("user")
                User.findOne({ username: 'testone' }).then((result) => {
                    expect(result).to.equal(null)
                    done()
                })

            })
    })

    it("Should return a users hardware", (done) => {
        agent
            .get("/Users/testone/hardware")
            .send()
            .end((err, res) => {
                if (err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body.DATA).to.have.property("user")
                expect(res.body.DATA).to.have.property("hardware")
                done()
            })
    })

    it("Should add to a users hardware", (done) => {
        agent
            .post("/Users/testone/hardware")
            .send({DATA:{userpassword:'password', hardware:{
                type: "computer", 
                name: "DustomNameTEST", 
                specs: "intel" }}})
            .end((err, res) => {
                if (err) throw err.message
                expect(res).to.have.status(201)
                expect(res.body.DATA).to.have.property("user")
                expect(res.body.DATA).to.have.property("hardware")
                expect(res.body.DATA.hardware[1]).to.have.deep.property("name","DustomNameTEST")
                done()
            })
    })

    it("Should update a users hardware", (done) => {
        agent
            .put("/Users/testone/hardware")
            .send({ DATA: { "userpassword": "password","Hardware":{name:"catdookdough"} ,"Changes": { specs: "intel33" } } })
            .end((err, res) => {
                if (err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body.DATA).to.have.property("user")
                expect(res.body.DATA).to.have.property("hardware")
                expect(res.body.DATA.hardware).to.have.deep.property("specs", "intel33")
                done()
            })
    })


    it("Should delete from a users hardware", (done) => {
        agent
            .delete("/Users/testone/hardware")
            .send({DATA:{ userpassword:"password" , hardware:{type: "computer", name: "catdookdough", specs: "intel33" }}})
            .end((err, res) => {
                if (err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body.DATA).to.have.property("user")
                expect(res.body.DATA).to.have.property("hardware")
                expect(res.body.DATA.hardware).to.have.deep.property("type", "computer")
                done()
            })
    })


    it("Should return a users software", (done) => {
        agent
            .get("/Users/testone/software")
            .send()
            .end((err, res) => {
                if (err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body.DATA).to.have.property("user")
                expect(res.body.DATA).to.have.property("software")
                done()
            })
    })

    it("Should add to a users software", (done) => {
        agent
            .post("/Users/testone/software")
            .send({DATA:{userpassword:"password",software:{ name: "BACKOS", version: "Big Tur", type: "OS" }}})
            .end((err, res) => {
                if (err) throw err.message
                expect(res).to.have.status(201)
                expect(res.body.DATA).to.have.property("user")
                expect(res.body.DATA).to.have.property("software")
                expect(res.body.DATA.software[0]).to.have.deep.property("version", "Big Tur")
                done()
            })
    })

    it("Should update a users software", (done) => {
        agent
            .put("/Users/testone/software")
            .send({DATA:{userpassword:"password",software: { name: "BACKOS", version: "Big Tur", type: "OS" }, Changes:{type:"OSx"}}})
            .end((err, res) => {
                if (err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body.DATA).to.have.property("user")
                expect(res.body.DATA).to.have.property("software")
                expect(res.body.DATA.software).to.have.deep.property("type", "OSx")
                done()
            })
    })


    it("Should delete from a users software", (done) => {
        agent
            .delete("/Users/testone/software")
            .send({DATA:{userpassword:"password", software:{ name: "BACKOS", version: "Big Tur", type: "OSx" }}})
            .end((err, res) => {
                if (err) throw err.message
                expect(res).to.have.status(200)
                expect(res.body.DATA).to.have.property("user")
                expect(res.body.DATA).to.have.property("software")
                expect(res.body.DATA.software).to.not.have.deep.property("type", "OS")
                done()
            })
    })



})