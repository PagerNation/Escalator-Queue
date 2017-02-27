import request from 'request-promise-native';
import queueManager from '../managers/queue';
import config from '../../config/env';
import { Job } from 'kue';

const ONE_MINUTE_MILLISECONDS = 60 * 1000;

queueManager.process('page', config.pageQueueSize, processPageQueue);

function bulkCreatePages(pageRequests) {
  if (!pageRequests) {
    return Promise.resolve();
  }
  const ticketPromises = pageRequests.map((page) => {
    const ticket = page.ticket;
    const user = page.user;
    const deviceIndex = page.deviceIndex;
    return createDelayedPage(ticket, user, deviceIndex);
  });

  return Promise.all(ticketPromises);
}

function createDelayedPage(ticket, user, deviceIndex) {
  const jobDetails = {
    ticket,
    user,
    device: user.devices[deviceIndex],
    title: ticket.metadata.title
  };

  return new Promise((resolve, reject) => {
    const job = queueManager.create('page', jobDetails)
      .delay(user.delays[deviceIndex] * ONE_MINUTE_MILLISECONDS)
      .save(() => {
        resolve(job);
      });
  });
}

function processPageQueue(job, done) {
  const options = {
    method: 'POST',
    uri: `${config.apiHost}/${config.apiPath}`,
    headers: {
      Authorization: `Bearer ${config.apiToken}`
    },
    body: job.data,
    json: true
  };

  return request(options)
    .then((res) => {
      done();
    });
}

function cancelPages(pageIds) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < pageIds.length; i++) {
      Job.remove(pageIds[i], (err) => {});
    }
    resolve();
  });
}

export default {
  bulkCreatePages,
  createDelayedPage,
  processPageQueue,
  cancelPages
};
