'use strict';

var chalk = require('chalk');
var utils = require('./utils');
var log = utils.log;
var logHeader = utils.logHeader;
var logFooter = utils.logFooter;

var commands = Object.keys(require('require-dir')('../lib'));

function parseCommands(arr) {
  log('    Commands: ');
  arr.map(function(cmd) {
    log('        ' + cmd);
  });
}

module.exports = function help(req, next) {
  log();
  logHeader('Help Menu', 'green');
  log();
  log('    Usage:', 'yellow');
  log('        $> geotrans <COMMAND> <INPUT> <OUTPUT> [OPTIONS]', 'yellow');
  log();
  parseCommands(commands);
  log();
  log('    General Options: ');
  log('        -h, --help        Help Menu');
  log('        -v, --version     GeoTrans Version');
  log('        -t, --topo-type   Select the desired topo map type');
  log('                          - "all" default', 'gray');
  log('                          - "carto"', 'gray');
  log('                          - "terrain"', 'gray');
  log('                          - "imagery"', 'gray');
  log('        -l, --layers      Specify layers on output map.');
  log('                          - example: --layers "transportation,boundaries,plss"', 'gray');
  log('        -x, --clipped     Clip pdf2tif at map neatline.');
  log('        -c, --compress    Compression type for output file.');
  log('        -z, --z-level     ZLevel Compression');
  log('                          - "6" default', 'gray');
  log('                          - "(1-9)"', 'gray');
  log();
  logFooter();
}
