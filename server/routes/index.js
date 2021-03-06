import express from 'express';
import queueRoutes from './queue';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/v1/queue', queueRoutes);

export default router;
