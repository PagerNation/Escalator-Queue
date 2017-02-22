import express from 'express';
import validate from 'express-validation';
import queueCtrl from '../controllers/queue';

const router = express.Router();  // eslint-disable-line new-cap

router.route('/')
  .post(queueCtrl.bulkCreatePages)
  .delete(queueCtrl.cancelPages);

export default router;
