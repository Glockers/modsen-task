import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';

export const swaggerUIOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/models/*/*.router.ts', './src/models/*/schemas/*.shema.ts']
};