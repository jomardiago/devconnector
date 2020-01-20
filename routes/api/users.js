const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    Test our user route
// @acess   Public
router.get('/', (req, res) => res.send('User Route'));

module.exports = router;