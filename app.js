const path = require('path');
const express = require('express');
const app = express();
const PORT = 4444;
const hbs = require('hbs');
const session = require('express-session');
const passport = require('./auth/passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));

require('dotenv').config();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL})
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.redirect('/api/authenticate');
});

app.use('/api/authenticate',require('./routes/authenticate'));

app.use('/api/home',require('./routes/home'));

app.use('/api/posts/',require('./routes/post'));

app.use('/api', require('./routes/like'));

app.use('/api', require('./routes/follow'));

app.use('/api/comment', require('./routes/comment'));

app.use('/api/user', require('./routes/profile'));

app.use('/api/all_posts', require('./routes/allUserPosts'));

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        });
    })
    .catch(err=>{
        console.log("Connection err: ",err);
    }
);