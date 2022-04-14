const express = require("express");
const router = express.Router();
const AuthorController = require("../controller/author.controller");
router.get("/", AuthorController.listAuthors);

module.exports = router;
