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
  apis: ['./src/modules/*/*.router.ts', './src/auth/*.router.ts', './src/**/schemas/*.yaml']
};
