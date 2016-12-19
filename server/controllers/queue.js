import httpStatus from 'http-status';

function checkStatus(req, res) {
  res.sendStatus(200);
}

export default { checkStatus };
