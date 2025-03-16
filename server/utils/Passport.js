// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import User from '../models/Userschema.js';

// passport.serializeUser((user, done) => {
//    done(null, user.id);
// });

// passport.deserializeUser((id, done) =>
//    User.findById(id, (err, user) => done(err, user)),
// );


// const PassportConfig = ()=>{

//   passport.use(
//     new GoogleStrategy(
//        {
//           clientID: process.env.GOOGLE_CLIENT_ID,
//           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//           callbackURL: '/api/user/auth/google/callback',
//           passReqToCallback: true,
//        },
//        async (req, accessToken, refreshToken, profile, done) => {
//           try {
//              const user = await User.findOne({ googleId: profile.id });
//              if (!user) {
//                 // Create a new user
//                 const newUser = new User({
//                    googleId: profile.id,
//                    email: profile.emails[0].value,
//                    fullname: profile.displayName,
//                 });
//                 await newUser.save();
//                 return done(null, newUser);
//              } else {
//                 return done(null, user);
//              }
//           } catch (err) {
//              return done(err);
//           }
//        },
//     ),
//  );
// }

// export default PassportConfig
