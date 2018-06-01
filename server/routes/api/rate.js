const express = require('express');
// https://www.npmjs.com/package/express-promise-router
const router = require('express-promise-router')();

// Controllers
const RateController = require('../../controllers/rate');

// @reute  GET api/auth/validation
// @desc   auth entry before check
// @access Public
router
  .route('/getRate')
  .post(
    RateController.getRate
  );

// @reute  GET api/users/signin
// @desc   signuin
// @access Public
router
  .route('/updateRate')
  .post(
    RateController.updateRate
  );

module.exports = router;
