// generateResetToken.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateResetToken = (email) => {
  const randomString = crypto.randomBytes(32).toString('hex');
  return jwt.sign({ email }, process.env.RESET_TOKEN_SECRET, { expiresIn: '2h' });
};


module.exports = generateResetToken;
