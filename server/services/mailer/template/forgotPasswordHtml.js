module.exports = forgotPasswordHtml => {

  var conf = require('../../../config/conf.json');

  let url = conf.CHANGE_PASSWORD_URL + forgotPasswordHtml.local.secretToken

  return `
  <html>
    <body>
      <p>Please Reset your password from folloing Link.</p>
      ${
        url
      }
    </body>
  </html>
  `;
};
