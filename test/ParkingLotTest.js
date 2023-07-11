const chai = require("chai");
let chaiHttp = require("chai-http");
const app = require("../app");

chai.should();
chai.use(chaiHttp);

describe("ParkingLot", () => {
    describe("GET Recent parking lots", () => {
        it("it should get all recent parking lots", (done) => {
            chai
                .request(app)
                .get("/parking_lots")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a("array");
                    res.body.data.length.should.be.eql(2);
                    done();
                });
        });
    });
});