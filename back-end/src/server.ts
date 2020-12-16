import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';

import config from '@config/config';
import logging from '@config/logging';

import sampleRoutes from './routes/sample';

const NAMESPACE = 'Server';
const router = express();

router.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
  res.on('finish', () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  });
  next();
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    return res.status(200).json({});
  }
  next();
});

router.use('/sample', sampleRoutes);

router.use((req, res) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () =>
  logging.info(NAMESPACE, `Server Running on ${config.server.hostname}:${config.server.port}`)
);
// mongodb+srv://survey_app_dev:<password>@cluster0.z12mh.mongodb.net/<dbname>?retryWrites=true&w=majority
