const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Ninja Library API',
      version: '1.0.0',
      description: 'API documentation for Ninja Library System',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Replace with your URL
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
