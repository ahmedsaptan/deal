process.env.NODE_ENV = "test";

const Article = require("../models/Article.model");
const Author = require("../models/Author.model");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
const bcrypt = require("bcryptjs");
const { genToken } = require("../services/jwt.service");
chai.use(chaiHttp);

describe("Article", () => {
  let user, token;
  before(async () => {
    await Author.remove({});
    const pass = "userPass12345";
    const hashPassword = bcrypt.hashSync(pass, 10);

    const author = new Author({
      email: "testUser@g.com",
      name: "ahmed",
      password: hashPassword,
      jobTitle: "testing",
    });
    await author.save();
    user = author;
    token = genToken(user._id);
  });
  beforeEach((done) => {
    Article.remove({}, (err) => {
      done();
    });
  });

  describe("/GET articles", () => {
    it("it should GET all the articles with token", (done) => {
      chai
        .request(server)
        .get("/api/articles")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.articles.should.be.a("array");
          res.body.articles.length.should.be.eql(0);
          done();
        });
    });
    it("it should GET all the articles without token", (done) => {
      chai
        .request(server)
        .get("/api/articles")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.articles.should.be.a("array");
          res.body.articles.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/POST articles", () => {
    it("it should not post article no token", (done) => {
      const article = {
        title: "test",
      };
      chai
        .request(server)
        .post("/api/articles")
        .send(article)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });
    //--------------
    it("it should not post article no title", (done) => {
      const article = {};
      chai
        .request(server)
        .post("/api/articles")
        .send(article)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });
    //--------------
    it("it should not post article no body", (done) => {
      const article = {
        title: "test app",
      };
      chai
        .request(server)
        .post("/api/articles")
        .send(article)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });
    //--------------
    it("it should post article", (done) => {
      const article = {
        title: "title of articles",
        body: "body of article",
      };
      chai
        .request(server)
        .post("/api/articles")
        .send(article)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.article.should.have.property("title");
          res.body.article.should.have.property("author");
          res.body.article.should.have.property("_id");
          res.body.article.should.have.property("body");
          done();
        });
    });
    // -----------
  });

  describe("/POST comment to article", () => {
    it("it should not post comment to article no token", async () => {
      const article = new Article({
        title: "title of articles",
        body: "body of article",
        author: user._id,
      });

      await article.save();
      const res = await chai
        .request(server)
        .post(`/api/articles/${article._id}/comment`);
      res.should.have.status(401);
      res.body.should.be.a("object");
      res.body.should.have.property("message");
    });
    //--------------
    it("it should not post comment to article no body", async () => {
      const article = new Article({
        title: "title of articles",
        body: "body of article",
        author: user._id,
      });

      await article.save();
      const res = await chai
        .request(server)
        .post(`/api/articles/${article._id}/comment`)
        .set({ Authorization: `Bearer ${token}` });
      res.should.have.status(422);
      res.body.should.be.a("object");
      res.body.should.have.property("message");
    });
    //--------------
    it("it should  post comment to article", async () => {
      const article = new Article({
        title: "title of articles",
        body: "body of article",
        author: user._id,
      });

      await article.save();
      const res = await chai
        .request(server)
        .post(`/api/articles/${article._id}/comment`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          body: "first comment",
        });
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("comment");
    });

    // -----------
  });

});
