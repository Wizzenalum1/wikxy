const express = require('express');
const router = express.Router();

router.use('/post',require('./posts'))

module.exports = router