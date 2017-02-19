import kue from 'kue';

const queue = kue.createQueue();
kue.app.listen(3001);

export default queue;
