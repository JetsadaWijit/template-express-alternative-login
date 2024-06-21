const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('./controllers/authController');
const authRoutes = require('./routes/authRoutes');
const config = require('./config/config');

const app = express();

app.use(bodyParser.json());
app.use(session({ secret: config.sessionSecret, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Home</h1><a href="/auth/github">Login with GitHub</a><br><a href="/auth/gitlab">Login with GitLab</a><br><a href="/auth/facebook">Login with Facebook</a><br><a href="/auth/google">Login with Google</a>');
});

app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.send(`<h1>Profile</h1><pre>${JSON.stringify(req.user, null, 2)}</pre>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
