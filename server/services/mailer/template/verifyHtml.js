module.exports = verifyHtml => {

  var conf = require('../../../config/conf.json');

  let url = conf.VERIFY_PASSWORD_URL + verifyHtml.local.secretToken

  return `
  <html>
    <body>
      <p>Hello</p>
      <p>Thankyou for registeration!</p>
      <p>Please verifty your email cliking following url:</p>
      ${
        url
      }
      <br />
    </body>
  </html>
  `;
};
