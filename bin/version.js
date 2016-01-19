'use strict';

var utils = require('./utils');
var pkg = require('../package.json');

module.exports = function version() {
  utils.log();
  utils.logHeader('Version', 'blue');
  utils.log();
  utils.log(utils.bold('    v' + pkg.version));
  utils.logFooter();
}
