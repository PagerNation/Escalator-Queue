import queueService from '../../services/queue';
import queueManager from '../../managers/queue';
import constants from '../constants';

const ONE_MINUTE_MILLI = 60 * 1000;

describe('## Queue Service', () => {
  before(() => queueManager.enterTestMode());
  afterEach(() => queueManager.clearTestMode());

  describe('# createDelayedPage()', () => {
    it('creates a delayed page', (done) => {
      queueService.createDelayedPage(constants.ticket, constants.user, 0)
        .then(() => {
          expect(queueManager.testMode.jobs.length).to.equal(1);
          expect(queueManager.testMode.jobs[0].type).to.equal('page');
          expect(queueManager.testMode.jobs[0].data.title).to.equal(constants.ticket.metadata.title);
          expect(queueManager.testMode.jobs[0]._delay).to.equal(constants.user.delays[0] * ONE_MINUTE_MILLI);
          done();
        });
    });
  });

  describe('# bulkCreatePages()', () => {
    it('creates a delayed page through bulk method', (done) => {
      const payload = [{
        ticket: constants.ticket,
        user: constants.user,
        deviceIndex: 0
      }];
      queueService.bulkCreatePages(payload)
        .then(() => {
          expect(queueManager.testMode.jobs.length).to.equal(1);
          expect(queueManager.testMode.jobs[0].type).to.equal('page');
          expect(queueManager.testMode.jobs[0].data.title).to.equal(constants.ticket.metadata.title);
          expect(queueManager.testMode.jobs[0]._delay).to.equal(payload[0].user.delays[0] * ONE_MINUTE_MILLI);
          done();
        });
    });
  });
});
