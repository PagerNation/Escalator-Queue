import request from 'request-promise-native';
import queueManager from '../managers/queue';
import config from '../../config/env';
import { Job } from 'kue';

queueManager.process('page', config.pageQueueSize, processPageQueue);

function bulkCreatePages(pageRequests) {
  if (!pageRequests) {
    return Promise.resolve();
  }
  const ticketPromises = pageRequests.map((page) => {
    const ticketId = page.ticketId;
    const userId = page.userId;
    const device = page.device;
    const delay = page.delay;
    const title = page.title;
    return createDelayedPage(ticketId, userId, device, delay, title);
  });

  return Promise.all(ticketPromises);
}

function createDelayedPage(ticketId, userId, device, delay, title) {
  const jobDetails = {
    ticketId,
    userId,
    device,
    title: `${title} - ${device.name}`
  };

  return new Promise((resolve, reject) => {
    const job = queueManager.create('page', jobDetails)
      .delay(delay)
      .save(() => resolve(job));
  });
}

function processPageQueue(job, done) {
  const options = {
    method: 'POST',
    uri: `${config.apiHost}/${config.apiPath}`,
    headers: {
      Authorization: `${config.apiToken}`
    },
    body: job.data,
    json: true
  };

  return request(options)
    .then(res => done());
}

function cancelPages(pageIds) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < pageIds.length; i++) {
      Job.remove(pageIds[i], () => {});
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
