const express = require('express');
const router = express.Router();

router.use("/users", require("./author.route"))

module.exports = router;
