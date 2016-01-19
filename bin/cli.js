#! /usr/bin/env node

var EventEmitter = require('events').EventEmitter;
var minimist = require('minimist');
var requireDir = require('require-dir');
var pkg = require('../package.json');

var geoTrans = requireDir('../lib');

var commands = Object.keys(geoTrans);

var utils = require('./utils');
var help = require('./help');
var version = require('./version');

function cli(config) {

  var options = {
    alias: {
      h: 'help',
      v: 'version',
      t: 'topo-type',
      x: 'clipped',
      l: 'layers',
      f: 'format',
      c: 'compress',
      z: 'z-level'
    }
  }

  var args = minimist(config, options);
  var cmd = args._[0];
  var params = args._.slice(1);
  var opts = args;
  delete opts['_'];

  if (opts.v || opts.version) {
    return version();
  }

  if (opts.h || opts.help) {
    return help();
  }

  if (!cmd) {
    return help();
  }

  return execute(cmd, params, opts);

}

function execute(cmd, params, opts) {
  if (commands.indexOf(cmd) === -1) {
    return abort(cmd);
  }

  var emittor = new EventEmitter();
  emittor.on('error', utils.log);
  emittor.on('data', utils.log);
  emittor.on('close', utils.log);

  return geoTrans[cmd](params, opts, emittor);
}

function abort(cmd) {
  utils.log();
  utils.log('Command '+ utils.accent(cmd) +' not found', 'red');
  utils.logFooter();
}

cli(process.argv.slice(2));
