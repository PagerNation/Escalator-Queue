# Escalator-Queue

<p align="center">
  <img src="https://68.media.tumblr.com/92cd77fe9be7ae743612bfbd532194e8/tumblr_ofdd0uaBFM1r3t8ico2_r1_1280.gif">
</p>

## Set Up

### Pre-conditions

This Queue requires the Escalator-API to be running in order to function correctly. To set up the API, follow the steps in the README located [here](https://github.com/PagerNation/Escalator-API)

### Installation

Ensure that [Node.js 6.x](https://nodejs.org/en/download/) and [Redis 3.2](https://redis.io/download) are both installed

`npm install`

### Configuration

Numerous environment variables need to be configured before the server can be started
`.env.*` files will need to be created for each environment (`test`, `development`, `production`). Eg: `.env.test`.

The boilerplate for these is as follows

```
API_HOST=
API_PATH=
API_PORT=

PAGE_QUEUE_SIZE=

API_TOKEN=

PORT=
```

The fields represent the following

API settings are for the Escalator API, [found here](https://github.com/PagerNation/Escalator-API)

`API_HOST=`

`API_PATH=`

`API_PORT=`

`PAGE_QUEUE_SIZE=`

    Max messages in the queue

`API_TOKEN=`

    Token to be used in messages sent to the API. This must be the same as the `QUEUE_SECRET` in the API environment variables.

`PORT=`

    Port of this application

### Running

Start redis
`$ redis-server`

Start Queue
`$ npm start`

## Tests

`npm test`

## Problems?

If babel takes a while, try `npm dedupe` to flatten dependencies
