import kue from 'kue';

export default (function () {
  const queue = kue.createQueue();
  kue.app.listen(3001);

  queue.enterTestMode = () => queue.testMode.enter();
  queue.clearTestMode = () => queue.testMode.clear();
  queue.exitTestMode = () => queue.testMode.exit();

  return queue;
}());
