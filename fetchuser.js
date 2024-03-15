const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Rahul';

const fetchuser = (req, res, next) => {
  // Get token from header
  const token = req.header('auth-token');

  // Check if token does not exist
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Set user in request object
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = fetchuser;
