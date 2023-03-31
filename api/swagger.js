const dotenv = require('dotenv');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/userRoutes.js',
    './routes/drinkRoutes.js',
    './routes/eatRoutes.js',
    './routes/sleepRoutes.js',
    './routes/travelRoutes.js',
    './routes/enjoyRoutes.js',
    './routes/placeDetailRoutes.js',
    './routes/searchParametersRoutes.js',
];
const hostName = dotenv.config().parsed.WEBSITE_HOSTNAME;
console.log(hostName)
const doc = {
    info: {
      title: 'Trip Planner API',
    },
    host: hostName + '/api',
    schemes: ['http','https'],
    apis: endpointsFiles,
  };


swaggerAutogen(outputFile, endpointsFiles, doc);