import request from 'request-promise-native';
import queue from '../managers/queue';
import config from '../../config/env';

const ONE_MINUTE_MILLISECONDS = 1000;//60 * 1000; TODO: CHANGE THIS BACK TO MINUTES
const PAGE_QUEUE_SIZE = 1000;

queue.process('page', PAGE_QUEUE_SIZE, processPageQueue);

// bulkCreatePages([{
//   ticket: 'hello',
//   user: {
//     "_id" : "58a092962361da2fac76dae5",
//     "name" : "Whitney_Goodwin",
//     "email" : "Madyson.Walter@yahoo.com",
//     "role" : 0,
//     "delays" : [
//         1
//     ],
//     "devices" : [
//         {
//             "contactInformation" : "+15855061383",
//             "type" : "sms",
//             "name" : "et",
//             "__v" : 0,
//         },
//         {
//             "contactInformation" : "Rosemary0@gmail.com",
//             "type" : "email",
//             "name" : "aut",
//             "__v" : 0,
//         }
//     ]
//   },
//   deviceIndex: 0
// }]);

function bulkCreatePages(pageRequests) {
  const ticketPromises = pageRequests.map((page) => {
    const ticket = page.ticket;
    const user = page.user;
    const deviceIndex = page.deviceIndex;
    return createDelayedPage(ticket, user, deviceIndex);
  });

  return Promise.all(ticketPromises);
}

// Start a delayed job
function createDelayedPage(ticket, user, deviceIndex) {
  const jobDetails = {
    ticket,
    user,
    device: user.devices[deviceIndex]
  }

  const job = queue.create('page', jobDetails)
    .delay(user.delays[deviceIndex] * ONE_MINUTE_MILLISECONDS)
    .save();

  return Promise.resolve(job);
}

// job is the job being processed, includes all the data for the job
// done is a callback for when the job is finished
function processPageQueue(job, done) {
  // 1 start process
  // 2 get info from job about who to page {type, description, userId(for adding to the ticket)}
  // 3 send page
  // 4 save page in ticket on completed
  // 5 queue up next page?

  // const user = job.data.user;
  // const ticket = job.data.ticket;
  // const device = job.data.device;
  // device instead of the user?

  const options = {
    method: 'POST',
    uri: `${config.apiHost}/${config.apiPath}`,
    headers: {
      Authorization: `Bearer ${config.apiToken}`
    },
    body: job.data,
    json: true
  };

  request(options)
    .then((res) => {
      console.log('Sent to API',res);
      done();
    })
    .catch((err) => {
      console.log('err',err);
      done()
    });
}

export default {
  bulkCreatePages,
  createDelayedPage,
  processPageQueue
};
