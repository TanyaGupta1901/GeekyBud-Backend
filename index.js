//geekyBud
//osucTAymfEX14hnb

// establishing app using express
require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes')
const mongoose  = require('mongoose');
var bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
var User = require('./models/User');
const cors = require('cors');  
app.use(cors());

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected mongo db"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({extended : true}))
app.use(express.json({
  type: ['application/json', 'text/plain']
}))

// app.use(require('express-session')({
//   secret: "Secret isn't meant to be told",
//   resave: false,
//   saveUninitialized: false,
//   cookie : { secret : true }
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use('/',mainRoutes);
app.use('/users',authRoutes);
app.use('/posts',postRoutes);

app.listen(port, ()=>{
    console.log(`live on ${port}`)
})

// establisishing database connection

