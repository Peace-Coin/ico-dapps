// Json Web Token
// URL: https://jwt.io/
//      https://github.com/auth0/node-jsonwebtoken
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/keys');
const randomstring = require('randomstring');
const mailer = require('../services/mailer/mailer');
const verifyHtml = require('../services/mailer/template/verifyHtml');
const forgotPasswordHtml = require('../services/mailer/template/forgotPasswordHtml');
const config = require('../config/mailer');

signToken = user => {
  let handleName = 'guest';

  if (user.local != undefined) {
    handleName = user.local.email;
  } else if (user.google != undefined) {
    handleName = user.google.email;
  } else if (user.facebook != undefined) {
    handleName = user.facebook.email;
  }

  return JWT.sign(
    {
      iss: 'ico-dapps',
      sub: user.id,
      iat: new Date().getTime(), // Current Time
      exp: new Date().setDate(new Date().getDate() + 1), // Current time + 1 day ahead
      email: handleName
    },
    JWT_SECRET
  );
};

// PasswordResetToken = secret => {
//   return JWT.sign(
//     {
//       iss: 'ico-dapps-temporary-token',
//       sub: secret,
//       iat: new Date().getTime(), // Current Time
//       exp: new Date().setDate(new Date().getDate() + 1) // Current time + 1 day ahead
//     },
//     JWT_SECRET_FORGOT_PASSWORD
//   );
// };

module.exports = {
  signUp: async (req, res, next) => {

    try{

    const { email, password } = req.value.body;
    // Check if there is a user with the same mail
    const foundUser = await User.findOne({ 'local.email': email });
    if (foundUser) {
      let error = {
        validation: {
          email: 'Email is already in use'
        }
      };

      return res.status(400).json(error);
    }

    // generate reset token
    let secretToken;

    let existFlg = true;

    //secretToken 重複チェック
    while (existFlg){

      secretToken = randomstring.generate(128);

      let existSecretTokenUser = await User.findOne({ 'local.secretToken': secretToken });

      console.log('secretToken -> ' + secretToken)
      console.log('!existSecretTokenUser -> ' + !existSecretTokenUser)
      console.log('password -> ' + password)

      if (!existSecretTokenUser) {

        existFlg = false;
      }
    }

    // creae a new user
    const newUser = new User({
      method: 'local',
      local: {
        email: email,
        password: password,
        active: false,
        secretToken: secretToken
      }
    });
    await newUser.save();

    // Compose message & Send the Email
    const message = {
      from: config.MAIL_SENDER,
      to: newUser.local.email,
      subject: 'Please, Please Verify your email!',
      html: verifyHtml(newUser)
    };
    await mailer.sendEmail(message);

  }catch(err){

    console.log('signup err -> ')
    console.log(err)
  }

    res
      .status(200)
      .json({ message: 'Entry Success, Please verify your email.' });
  },

  signIn: async (req, res, next) => {
    const token = signToken(req.user);

    res.status(200).json({
      success: true,
      token: token,
      userid: req.user.id
    });
  },

  googleOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({
      success: true,
      token: token
    });
  },

  facebookOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({
      success: true,
      token: token
    });
  },

  secret: async (req, res, next) => {
    res.json({
      secret:
        'You are succesfully logied in, now secret resouce could be handled'
    });
  },

  current: async (req, res, next) => {
    res.json({
      id: req.user.id,
      email: req.user.local.email
    });
  },

  restricted: async (req, res, next) => {
    res.json({
      restricted: 'restricted resouce could be handled'
    });
  },

  verify: async (req, res, next) => {
    const { secretToken } = req.body;
    const user = await User.findOne({ 'local.secretToken': secretToken });

    if (!user) {
      return res.status(403).json({
        error: 'Secret Token not found'
      });
    }

    // Activate Account
    user.local.active = true;

    await user.save();

    res.status(200).json({
      message: 'Account is Successfuly Verified!'
    });
  },

  // Reset Password
  resetPassword: async (req, res, next) => {
    const { email } = req.body;
    // Check if there is a user with the same mail
    const foundUser = await User.findOne({ 'local.email': email });
    if (!foundUser) {
      let error = {
        validation: {
          email: 'Email is not Found.'
        }
      };
      return res.status(400).json(error);
    }

    // generate reset token
    let secretToken;

    let existFlg = true;

    //secretToken 重複チェック
    while (existFlg){

      secretToken = randomstring.generate(128);

      let existSecretTokenUser = await User.findOne({ 'local.secretToken': secretToken });

      console.log('secretToken -> ' + secretToken)
      console.log('!existSecretTokenUser -> ' + !existSecretTokenUser)

      if (!existSecretTokenUser) {

        existFlg = false;
      }
    }

    // Save Secret Token
    foundUser.local.secretToken = secretToken;
    foundUser.save();

    console.log('config.MAIL_SENDER')
    console.log(config.MAIL_SENDER)


    // send email reset url with it
    const message = {
      from: config.MAIL_SENDER,
      to: foundUser.local.email,
      subject: 'Password Reset Token',
      html: forgotPasswordHtml(foundUser)
    };
    await mailer.sendEmail(message);

    res.status(200).json({
      message: 'Password Reset Request is accepted, Now You can Reset Password.'
    });
  },

  sendError: async (req, res, next) => {

    const { err, info } = req.body;

    let body = `
      <div>
        <div>${new Date()}</div>
        <div>${err}</div>
        <div>${info}</div>
      </div>
    `;

    // send email reset url with it
    let message = {
      from: config.MAIL_SENDER,
      to: ['manabu@chime-p.com', 'takeo@thebind.io'],
      subject: 'Peace Coin ICO System Error',
      html: body
    };

    await mailer.sendEmail(message);

    res.status(200).json({
    });
  },

  // Update Password
  updatePassword: async (req, res, next) => {
    // Secret Token Check
    const { secretToken, password } = req.body;
    const foundUser = await User.findOne({ 'local.secretToken': secretToken });

    console.log('secretToken -> ' + secretToken)

    if (!foundUser || secretToken === null || secretToken === '') {
      return res.status(403).json({
        error: 'Secret Token is invalidated.'
      });
    }

    // Generate Rondom Token
    const newSecretToken = randomstring.generate(128);

    // Password & secretToken is updated
    await foundUser.updatePassword(password);
    foundUser.local.secretToken = newSecretToken;
    foundUser.local.active = true;
    foundUser.save();

    // Check if the password is correct
    const isMatch = await foundUser.isValidPassword(password);
    // If not, handle it
    if (!isMatch) {
      return res.status(400).json({
        message: 'Password does not match pattern.'
      });
    }

    res.status(200).json({
      message: 'Password is Updated.'
    });
  }

  // // Token Check for Update Password
  // updatePasswordTokenCheck: async (req, res, next) => {
  //   // Secret Token Check
  //   const { secretToken } = req.body;
  //   const foundUser = await User.findOne({ 'local.secretToken': secretToken });

  //   if (!foundUser || secretToken === null || secretToken === '') {
  //     return res.status(403).json({
  //       error: 'Secret Token is invalidated.'
  //     });
  //   }

  //   const token = PasswordResetToken(secretToken);

  //   res.status(200).json({
  //     success: true,
  //     token: token
  //   });
  // }
};
