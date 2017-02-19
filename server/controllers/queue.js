import httpStatus from 'http-status';
import queueService from '../services/queue';

function bulkCreatePages(req, res, next) {
  queueService.bulkCreatePages(req.body.pages)
    .then(() => res.sendStatus(httpStatus.OK))
    .catch(err => next(err));
}

export default {
  bulkCreatePages
};
