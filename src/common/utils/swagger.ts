import { Application, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerUIOptions } from '../../config/swagger.config';

const swaggerSpec = swaggerJsdoc(swaggerUIOptions);

function swaggerDocs(app: Application, port: number) {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // TODO CHANGE
  console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
