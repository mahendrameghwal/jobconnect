const jwt =  require("jsonwebtoken")
const SECERET_KEY = process?.env?.JWT_SECRET;
const DecodeJWT = (res)=>{

    jwt.verify(token, SECERET_KEY, (err, decodedToken) => {
        if (err) {
          console.log(err);
          return res.status(403).send({ message: 'Invalid or expired token' });
        } else {
          console.log(decodedToken);
          return res
            .cookie('accesstoken', token, {
              httpOnly: true,
              secure: true, 
              expires: expirationDate,
              sameSite: 'strict',
              domain: 'https://jobconnect1.onrender.com',
              path: '/',
              
            })
            .status(200)
            .send({ message: 'login success', token:decodedToken }); 
        }
      });


}
module.exports = DecodeJWT