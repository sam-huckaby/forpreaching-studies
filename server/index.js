const express = require('express');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

// Go load environment variables
require('dotenv').config();

// The database connection setup script (with error handling afterwards)
const db = require('./database');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// TODO: Determine if I need this #####################################################################
// Configure any Passport.js strategies
// const passport = require('./passport/setup');

// TODO: Determine if I need this #####################################################################
// Custom routers to handle various subject types
// const authRouter = require('./routes/auth.route');
// const businessRouter = require('./routes/business.route');
// const userRouter = require('./routes/user.route');

// Setup the express server
const app = express();
const apiPort = 3001;

app.use(cors());

// In Production, we operate behind a proxy (and we want real IPs, so we can fight off non-Auth0 access)
app.set('trust proxy', true);

// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ======================= Auth0 JWT Route Authorization ===================

let jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://for-preaching.us.auth0.com/.well-known/jwks.json'
    }),
    // Native Auth0 clientId
    audience: 'https://for-preaching.com/',
    issuer: 'https://for-preaching.us.auth0.com/',
    algorithms: ['RS256']
});

// This will secure ALL routes. (jwtCheck is middleware, so I have alternately put it on individual routes)
//app.use(jwtCheck);

// ======================= Routes ===================

// Default response to a request that hits the server root
app.get('/api/test', (req, res) => {
    res.send('Hello World!');
});

// app.use('/api/auth', authRouter);
// app.use('/api', jwtCheck, businessRouter);
// app.use('/api', jwtCheck, userRouter);

// ======================= Express Init ===================

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
