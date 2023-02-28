const express = require('express');
const app = express();

const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');
require('./config/db');
const cors = require('cors');

const userRoutes = require("./routes/userRoutes");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/userRoutes.js', 
];

const doc = {
    info: {
      title: 'Trip Planner API',
    },
    host: process.env.WEBSITE_HOSTNAME + '/api',
    schemes: ['http', 'https'],
    apis: endpointsFiles,
  };


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js');
});

app.use('/api-docs', 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
);

const corsOptions = {
    origin: [process.env.CLIENT_URL],
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

app.use('/api/auth/', userRoutes);


const sdk = require('api')('@fsq-developer/v1.0#2ehz6bc12len5ghzp');

sdk.auth('fsq3I4zOjYBfvuaMcmztwjFFjyGLCRP84f05zC9vt3Zjsao=');
sdk.placeSearch({near: 'montrouge'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));

  
module.exports = app;