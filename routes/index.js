const express = require('express');
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/authors", require("./author.route"));
router.use("/articles", require("./article.route"));

module.exports = router;
