import express from 'express';

function bootstap() {
  const app = express();

  app.listen(() => {
    console.log('App started 8080 port.');
  });
}

bootstap();
