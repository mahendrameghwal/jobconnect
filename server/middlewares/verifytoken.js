import jwt from "jsonwebtoken";
const SECERET_KEY = process.env.JWT_SECRET;

const VerifyToken = async (req, res, next) => {
  
  try {
    const {accesstoken} = req?.cookies;
    // console.log('from accesstoken',accesstoken);

    if (!accesstoken) {
      return res.status(401).send({ message: 'Unauthorized user access' });
    }
    jwt.verify(accesstoken, SECERET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(403).send({ message: 'Invalid or expired token' });
      }else{
        req.user = decodedToken;
        next();
      }
    });
} catch (err) {

  return res.status(500).send({ message: 'something went wrong' });

}
};

export default  VerifyToken



