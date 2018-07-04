const express = require('express');
// https://www.npmjs.com/package/express-promise-router
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../../services/passport');

// Controllers
const MobileController = require('../../controllers/mobile');

// Passport JWT
const passportJWT = passport.authenticate('jwt', { session: false });

// Local auth
const passportSignIn = passport.authenticate('local', {
  session: false,
  failWithError: false
});

// Google auth
const passportGooogle = passport.authenticate('googleToken', {
  session: false
});

// Facebook auth
const passportFacebook = passport.authenticate('facebookToken', {
  session: false
});

router
  .route('/signup')
  .post( MobileController.signUp);

router
  .route('/signin')
  .post(
    passportSignIn,
    MobileController.signIn
  );

router
  .route('/resetPassword')
  .post( MobileController.resetPassword);

router
  .route('/updatePassword')
  .post( MobileController.updatePassword);

router
  .route('/getUserProfile')
  .post(
    passportJWT,
    MobileController.getUserProfile
);

module.exports = router;
