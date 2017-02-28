import httpStatus from 'http-status';
import queueService from '../services/queue';

function bulkCreatePages(req, res, next) {
  queueService.bulkCreatePages(req.body.pages)
    .then(pages => res.json(pages))
    .catch(err => next(err));
}

function cancelPages(req, res, next) {
  queueService.cancelPages(req.body.pageIds)
    .then(() => res.sendStatus(httpStatus.OK))
    .catch(err => next(err));
}

export default {
  bulkCreatePages,
  cancelPages
};
