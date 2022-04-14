process.env.NODE_ENV = "test";

let Author = require("../models/Author.model");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
const bcrypt = require("bcryptjs");

chai.use(chaiHttp);

describe("Authors", () => {
  beforeEach((done) => {
    Author.remove({}, (err) => {
      done();
    });
  });

  /*
   * Test the /GET route
   */
  describe("/GET authors", () => {
    it("it should GET all the authors", (done) => {
      chai
        .request(server)
        .get("/api/authors")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.authors.should.be.a("array");
          res.body.authors.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/POST register ", () => {
    it("it should not POST a author without email field", (done) => {
      let author = {};
      chai
        .request(server)
        .post("/api/auth/register")
        .send(author)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });

    //

    it("it should not POST a author without name field", (done) => {
      let author = {
        email: "t@g.com",
      };
      chai
        .request(server)
        .post("/api/auth/register")
        .send(author)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });

    //
    it("it should not POST a author without password field", (done) => {
      let author = {
        email: "t@g.com",
        name: "test name",
      };
      chai
        .request(server)
        .post("/api/auth/register")
        .send(author)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });

    //
    it("it should not POST a author without jobTitle field", (done) => {
      let author = {
        email: "t@g.com",
        name: "test name",
        password: "12546ajkgdj",
      };
      chai
        .request(server)
        .post("/api/auth/register")
        .send(author)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });

    it("it should  POST a author", (done) => {
      let author = {
        email: "t@g.com",
        name: "test name",
        password: "12546ajkgdj",
        jobTitle: "software eng",
      };
      chai
        .request(server)
        .post("/api/auth/register")
        .send(author)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("token");
          res.body.should.have.property("author");
          res.body.author.should.have.property("email");
          res.body.author.should.have.property("name");
          res.body.author.should.have.property("jobTitle");
          res.body.author.should.have.property("articles");
          done();
        });
    });
  });

  describe("/POST login", () => {
    it("it should not POST a author without email field", (done) => {
      let author = {};
      chai
        .request(server)
        .post("/api/auth/login")
        .send(author)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });

    //

    it("it should not POST a author without password field", (done) => {
      let author = {
        email: "t@g.com",
      };
      chai
        .request(server)
        .post("/api/auth/login")
        .send(author)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });

    it("it should not login author wrong data", (done) => {
      let author = {
        email: "t@g.com",
        password: "test name",
      };
      chai
        .request(server)
        .post("/api/auth/login")
        .send(author)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });

    it("it should not login author invalid password", () => {
      chai
        .request(server)
        .post("/api/auth/login")
        .send({
          email: "gg@g.com",
          password: "jhgskdjfgh",
        })
        .end((e, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
        });
    });

    it("it should login author ", () => {
      const pass = "atedh78362";
      const hashPassword = bcrypt.hashSync(pass, 10);

      const author = new Author({
        email: "jsgfks@g.com",
        name: "ahmed",
        password: hashPassword,
        jobTitle: "testing",
      });

      author.save((err) => {
        chai
          .request(server)
          .post("/api/auth/login")
          .send({
            email: "jsgfks@g.com",
            password: pass,
          })
          .end((e, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("token");
            res.body.should.have.property("author");
          });
      });
    });
  });
});
