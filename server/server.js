const express = require('express');
const controller = require('../app/controller');

/**
 * @type {express}
 * @constant {express.Application}
 */
const app = express();

/**
 * @description express.Application Controller
 */
controller.init(app);

/**
 * @description sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3001);

module.exports = app;
