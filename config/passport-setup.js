const passport=require('passport');
const googleStartegy=require('passport-google-oauth20');
const User = require('./modes');
const keys = require('./keys');


passport.serializeUser((user,done)=>{
    done (null,user.id);
});

passport.deserializeUser(async (id,done)=>{
    const user = await User.findById(id);
    done (null,user);
});

passport.use(
    new googleStartegy  ({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/redirect'
    }, async (accessToke,refreshToken,profile,done)=>{
            console.log('The callback function has been fired change');
            console.log(profile);
            //return done ();
            const currentUser = await User.findOne({googleid : profile.id});
            if (currentUser) {
                console.log(`User exists and it's ${currentUser}`);
                done (null,currentUser);
            }
            else {
            const newUser = await new User ({
                username : profile.displayName,
                googleid : profile.id,
                imagen : profile._json.picture
            }).save();
            console.log('new user created which is '+ newUser);
            done (null,newUser);
        }
            
    })
);