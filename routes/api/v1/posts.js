const express = require('express');
const router = express.Router();
const postController = require('../../../controllers/api/v1/posts_api');


router.get('/index',postController.index);
router.delete('/:id',postController.destroy);

module.exports = router