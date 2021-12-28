const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError');
const flash = require('connect-flash');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config()

const port = process.env.PORT || 3000;
const dbURL = process.env.DBURL || 'mongodb://localhost:27017/EasyBank';

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to EasyBank DB');
    })
    .catch(err => {
        console.error('Could not connect to EasyBank DB', err);
    });

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended : true}));

// Session Middleware
app.use(session
    ({
        secret: 'sessionsecret',
        saveUninitialized: true,
        resave: true
    })
);
// Flash Middleware
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get('/', (req, res) => {
    res.render('home');
})

app.use('/', routes);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 400));
})

app.use(( err, req, res, next ) => {
    const {status, message} = err;
    res.render('error', {message, status});
});


app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
})
