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
    schemes: ['http','https'],
    apis: endpointsFiles,
  };


swaggerAutogen(outputFile, endpointsFiles, doc);