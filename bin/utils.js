'use strict';

var chalk = require('chalk');
var colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray'];

function isColor(color) {
  if (colors.indexOf(color) !== -1) {
    return color;
  } else {
    return undefined;
  }
}

function accent(msg) {
  return chalk.bold.underline(msg);
}

function bold(msg) {
  return chalk.bold(msg);
}

function underline(msg) {
  return chalk.underline(msg);
}

function log(msg, color) {
  msg = msg || '';
  color = isColor(color) || 'white';

  console.log('    ' + chalk[color](msg));
}

function logHeader(msg, color) {
  msg = msg.toUpperCase();
  color = isColor(color) || 'white';

  var formatted = chalk[color].bold.underline(msg);

  log(formatted);
}

function logFooter() {
  log();
  log();
  log('    - For additional help enter...', 'gray');
  log(chalk.bold('        $> geotrans -h'), 'gray');
  log();
}

exports.accent = accent;
exports.bold = bold;
exports.underline = underline;
exports.log = log;
exports.logHeader = logHeader;
exports.logFooter = logFooter;
