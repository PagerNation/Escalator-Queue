import queueService from '../../services/queue.js';

const TICKET = {
  'metadata':{
    'title': 'Ticket Title'
  }
};

const USER = {
  'name' : 'Whitney_Goodwin',
  'email' : 'test@test.com',
  'delays' : [
      10
  ],
  'devices' : [
      {
          'contactInformation' : '+12345678909',
          'type' : 'sms',
          'name' : 'et'
      },
      {
          'contactInformation' : 'aussie@gmail.com',
          'type' : 'email',
          'name' : 'aut'
      }
  ]
};

describe('## Queue Service', () => {

  describe('# createDelayedPage()', () => {

    it('creates a ', (done) => {});

  });
});