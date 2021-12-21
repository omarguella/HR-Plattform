const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info: {
		title: 'ExpressJS API',
		description: 'Authors: Ameur Khemissi, Omar Guella, Svenja Baehr',
	},
	host: 'localhost:8080',
	schemes: ['http'],
	basePath: '/api'
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./src/routes/api-routes.js'];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
