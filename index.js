const debug = require('debug')('app:startup');
// const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();
const cors = require('cors');
// const courses = require('./routes/courses');

//---------------------IMPORT ROUTER -----------------------------//
const userRoute = require('./routes/userRoute');
const depositRoute = require('./routes/depositRoute');
const bankRoute = require('./routes/bankRoute');



const authRoute = require('./routes/authRoute');
//---------------------IMPORT ROUTER -----------------------------//

const logger = require('./logger')
 
// console.log('NODE_ENV: ' + process.env.NODE_ENV)
// console.log(app.get('env'));

// app.set('view engine','pug');
// app.set('views','./views');

// if(!config.get('jwtPrivateKey')){
//   console.error("FATAL ERROR: jwtPrivateKey is not defined.");
//   process.exit(1);
// }

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // key=value&key=value 
app.use(express.static('public'));
app.use(helmet());
app.use(cors());
// app.use('/', courses);

//---------------------ROUTER -----------------------------//
app.use('/api/user', userRoute);
app.use('/api/deposit', depositRoute);
app.use('/api/bank', bankRoute);


app.use('/api/auth', authRoute);

//---------------------ROUTER -----------------------------//

// // Configuration
// console.log('Application Name: ' + config.get('name'))
// console.log('Mail server: ' + config.get('mail.host'))
// console.log('Mail Password: ' + config.get('mail.password'))

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug("Morgan enabled...")
}

app.use(logger);
//DbWork;
// dbDebugger('Connected to Database')
// app.use((req, res, next) => {
//   console.log('Authentication..')
//   next();
// });


// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log("Listenning on port " + port + "...") })