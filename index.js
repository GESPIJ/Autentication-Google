const express = require('express');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const moongose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys')
//const profileRoutes = require('./profile-routes');
const app = express();


const isLoged = (req,res,next)=>{
    if (!req.user) res.redirect('/Login');
    else next ();
};

app.set('view-engine', 'ejs');
app.use (cookieSession({
    maxAge : 24*60*60*1000,
    keys : ['uhftcycidjdnsns']
}));

app.use (passport.initialize());
app.use (passport.session());

moongose.connect(keys.Mongodb,
{useNewUrlParser : true,
 useUnifiedTopology : true}, async ()=>{
     console.log('connected to mongo db greg');
});

//app.use ('/profile', profileRoutes);


app.get('/', (req,res)=>{
    res.render('home.ejs', {user :req.user});
});

app.get('/login', (req,res)=>{
    res.render('login.ejs', {usuario : req.user});
});

app.get('/register', (req,res)=>{
    res.send('HOLA');
});

app.get('/auth/google', passport.authenticate('google', {
    scope:['profile']
}));

app.get('/auth/google/redirect', passport.authenticate('google', {failureRedirect: '/'}), (req,res)=>{
    //res.send(`Your profile is ${req.user.username}`);
    res.redirect('/profile');
    console.log('FINALIZADO');
});

app.get('/profile', isLoged, (req,res)=>{
    console.log(req.user);
    res.render('profile.ejs', {user : req.user});
});

app.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect('/profile');
});


app.listen(3000);