import httpStatus from 'http-status';
import alertService from '../services/queue';

function bulkCreatePages(req, res, next) {
  queueService.bulkCreatePages(req.body)
    .then(() => res.status(httpStatus.OK))
    .catch(err => next(err));
}

function checkStatus(req, res) {
  res.sendStatus(httpStatus.OK);
}

export default {
  bulkCreatePages,
  checkStatus
};
