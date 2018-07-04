const MysqlConnection = require('../util/MysqlConnection');
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/keys');
const randomstring = require('randomstring');

signMobileToken = user => {
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
      iss: 'pcecoin-wallet',
      sub: user.id,
      iat: new Date().getTime(), // Current Time
      exp: new Date().setDate(new Date().getDate() + 1), // Current time + 1 day ahead
      email: handleName
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {

    try{

      const { email, password } = req.body;

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

        if (!existSecretTokenUser) {

          existFlg = false;
        }
      }

      //ここではhash作成のため、activeはfalse
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

      //一度saveし、active trueで再度save
      newUser.local.active = true;
      newUser.save();

    }catch(err){

      console.log('signup err -> ')
      console.log(err)
    }

    res
      .status(200)
      .json({ message: 'Entry Success.' });
  },
  signIn: async (req, res, next) => {

    const token = signMobileToken(req.user);

    res.status(200).json({
      success: true,
      token: token,
      userid: req.user.id
    });
  },
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

    res.status(200).json({
      secretToken: secretToken
    });
  },

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
  },

  getUserProfile: (req, res, next) => {

    let result;
    let conn;

    const userid = req.user.id;

    console.log('userid -> ')
    console.log(userid)

    try {

      //const { email, password } = req.value.body;

      console.log('getUserProfile controller start...')

      conn = MysqlConnection.getConnection();

      conn.query('SELECT * from m_profile where user_id = ?', [userid], (err, rows, fields) => {

        if (err) throw err;

        result = rows;

        return res
            .status(200)
            .json({ profile: result });
      });

    }catch(err){

      console.log('err -> ')
      console.log(err)

      return res
        .status(400)
        .json({ profile: result });

    } finally {

      MysqlConnection.endConnection(conn);
    }
  },
};
