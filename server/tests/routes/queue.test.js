import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import app from '../../../index';

const queueUrl = '/api/v1/queue';

describe('## Queue API', () => {
  describe('# GET /api/v1/queue', () => {
    it('should return 200', (done) => {
      request(app)
        .post(queueUrl)
        .expect(httpStatus.OK)
        .then(() => done());
    });
  });
});