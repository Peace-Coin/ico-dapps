module.exports = forgotPasswordHtml => {
  return `
  <html>
    <body>
      <p>Please Reset your password from folloing Link.</p>
      http://localhost:3000/update/password/${
        forgotPasswordHtml.local.secretToken
      }
    </body>
  </html>
  `;
};
