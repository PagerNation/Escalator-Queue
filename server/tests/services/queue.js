import queueService from '../../services/queue';
import queueManager from '../../managers/queue';
import constants from '../constants';

const ONE_MINUTE_MILLISECOND = 60 * 1000;

describe('## Queue Service', () => {
  before(() => queueManager.enterTestMode());
  afterEach(() => queueManager.clearTestMode());

  describe('# createDelayedPage()', () => {
    it('creates a delayed page', (done) => {
      const title = constants.ticket.metadata.title;

      queueService.createDelayedPage(
        constants.ticket.id,
        constants.user.id,
        constants.user.devices[0],
        1 * ONE_MINUTE_MILLISECOND,
        constants.ticket.metadata.title).then(() => {
          expect(queueManager.testMode.jobs.length).to.equal(1);
          expect(queueManager.testMode.jobs[0].type).to.equal('page');
          expect(queueManager.testMode.jobs[0].data.title)
            .to.equal(title + ' - ' + constants.user.devices[0].name);
          expect(queueManager.testMode.jobs[0]._delay)
            .to.equal(1 * ONE_MINUTE_MILLISECOND);
          done();
        });
    });
  });

  describe('# bulkCreatePages()', () => {
    it('creates a delayed page through bulk method', (done) => {
      const payload = [{
        ticketId: constants.ticket.id,
        userId: constants.user.id,
        device: constants.user.devices[0],
        delay: 1 * ONE_MINUTE_MILLISECOND,
        title: 'test title'
      }];
      queueService.bulkCreatePages(payload)
        .then(() => {
          expect(queueManager.testMode.jobs.length).to.equal(1);
          expect(queueManager.testMode.jobs[0].type).to.equal('page');
          expect(queueManager.testMode.jobs[0].data.title)
            .to.equal(payload[0].title + ' - ' + payload[0].device.name);
          expect(queueManager.testMode.jobs[0]._delay)
            .to.equal(payload[0].delay);
          done();
        });
    });
  });
});
