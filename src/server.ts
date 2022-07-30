import express, { Request, Response, NextFunction } from 'express';

import route from './route';

function bootstap() {
  const app = express();

  app.use('/crud/v1', route);

  app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof Error) {
        return response.status(400).json({
          message: err.message,
        });
      }
      return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err}`,
      });
    },
  );

  app.listen(() => {
    console.log('App started 8080 port.');
  });
}

bootstap();
