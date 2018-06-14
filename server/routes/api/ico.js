//const express = require('express');
const router = require('express-promise-router')();

// Controllers
const IcoController = require('../../controllers/ico');

// @reute  GET api/ico/status
// @desc   ico statsu
// @access Public
router.route('/status').get(IcoController.status);

module.exports = router;
