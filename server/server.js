const express = require('express');
const router = require('../config/router');

/**
 * @type {express}
 * @constant {express.Application}
 */
const app = express();

/**
 * @description express.Application Controller
 */
router.init(app);

/**
 * @description sets port 3000 to default or unless otherwise specified in the environment
 */
console.log(process.env);
app.set('port', process.env.PORT || 3006);

module.exports = app;
