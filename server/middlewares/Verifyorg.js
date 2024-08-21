const jwt = require('jsonwebtoken');
const SECERET_KEY = process.env.JWT_SECRET;

const Verifyorg = async (req, res, next) => {
  try {

    const {accesstoken} = req?.cookies;
  
    if (!accesstoken) {
      return res.status(401).send({ message: 'Unauthorized user access' });
    }
    jwt.verify(accesstoken, SECERET_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid or expired token' });
      }
      const { Isorg } = decodedToken;
      if (Isorg !== true) {
        return res.status(403).send({ message: "You can't do this action" });
      }
      req.user = decodedToken;
      next();
    });
  } catch (err) {
   return res.status(500).send({ message: err.message });
  }
};

module.exports = Verifyorg;
