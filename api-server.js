/* eslint-disable no-use-before-define, consistent-return, no-console */
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const IP_ADDR = '127.0.0.1';
const port = '8888';

const server = restify.createServer();

server.use(require('restify-plugins').queryParser());

const cors = corsMiddleware({
  preflightMaxAge: 5, // Optional
  origins: ['*'],
});

server.pre(cors.preflight);
server.use(cors.actual);

server.get({ path: '/device' }, getDeviceReading);
server.patch({ path: '/device/:readingName' }, patchDeviceReading);

const deviceReadings = [
  {
    id: 'acceleration',
    name: 'acceleration_x',
    unit: 'm/s2',
    value: 25.993848858558,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    id: 'acceleration',
    name: 'acceleration_y',
    unit: 'm/s2',
    value: -128.993848858558,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: false,
  },
  {
    id: 'acceleration',
    name: 'acceleration_z',
    unit: 'm/s2',
    value: -0.53,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    id: 'rotation',
    name: 'rotation_alpha',
    unit: 'deg',
    value: 356.63,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: false,
  },
  {
    id: 'rotation',
    name: 'rotation_beta',
    unit: 'deg',
    value: -18.14,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    id: 'rotation',
    name: 'rotation_gamma',
    unit: 'deg',
    value: -11.19,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    id: 'orientation',
    name: 'orientation',
    unit: 'deg',
    value: 0,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    id: 'latitude',
    name: 'latitude',
    unit: '',
    value: 52.49,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    id: 'rotationRate',
    name: 'rotation_rate_alpha',
    unit: 'deg/s',
    value: 0.04,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    id: 'rotationRate',
    name: 'rotation_rate_beta',
    unit: 'deg/s',
    value: 0.06,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    id: 'rotationRate',
    name: 'rotation_rate_gamma',
    unit: 'deg/s',
    value: 0,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
];

function getDeviceReading(req, res) {
  return res.send(200, { success: true, data: [...deviceReadings] }).end();
}

function patchDeviceReading(req, res) {
  const { params, query } = req;
  if (!query.active) {
    return res
      .send(400, {
        success: false,
        message: 'Query Param Missing Active Flag',
      })
      .end();
  }
  if (query.active !== 'true' && query.active !== 'false') {
    return res
      .send(400, {
        success: false,
        message:
          'Query Param Active Flag Can Only Be true/false [case sensitive]',
      })
      .end();
  }
  try {
    const TIMEOUT = Math.floor(Math.random() * 5000);
    const FAIL_RATE = Math.floor(Math.random() * 100);
    if (FAIL_RATE > 60) {
      return res
        .send(400, {
          success: false,
          message: 'Network timeout',
        })
        .end();
    }
    const targetIndex = deviceReadings.findIndex(
      el => el.name === params.readingName,
    );
    // console.log('Target Index Is', targetIndex);
    if (targetIndex < 0) {
      // Not Found
      return res
        .send(200, {
          success: false,
          message: 'Invalid readingName! No such device exist',
        })
        .end();
    }

    deviceReadings[targetIndex].active = query.active === 'true';

    setTimeout(() => {
      return res
        .send(200, {
          success: true,
          message: 'Successfully updated',
          data: deviceReadings[targetIndex],
        })
        .end();
    }, TIMEOUT);
  } catch (error) {
    console.log('\x1b[45m\x1b[37m', `Error ${error}`);
    return res
      .send(500, {
        success: false,
        error: 'Server Crash',
        info: error,
      })
      .end();
  }
}

server.listen(port, IP_ADDR, () => {
  console.log('\x1b[43m\x1b[30m', `${server.name} listening at ${server.url}`);
});
