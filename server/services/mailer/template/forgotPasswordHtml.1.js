const { HOME_URL } = require('../../../config/keys');

module.exports = forgotPasswordHtml => {
  return `
  <html>
    <body>
      <p>Please Reset your password from folloing Link.</p>
      ${HOME_URL}/update/password/${forgotPasswordHtml.local.secretToken}
    </body>
  </html>
  `;
};
