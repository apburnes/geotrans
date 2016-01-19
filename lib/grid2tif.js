'use strict';

var fs = require('fs');
var path = require('path');
var EventEmitter = require('events').EventEmitter;
var spawn = require('child_process').spawn;
var _ = require('lodash');

var demConfig = require('./utils/demConfig');

module.exports = grid2tif;

function grid2tif(params, options, emitter) {
  options = options || {};
  var config = demConfig(_.assign(options, {f: 'GTiff'}));

  var cmdArgs = params.concat(config);

  return translate(cmdArgs, emitter);
}

function translate(cmdArgs, emitter) {
  var cmd = spawn('gdal_translate', cmdArgs);

  cmd.stderr.on('data', function(data) {
    emitter.emit('warning', data);
  });

  cmd.stdout.on('data', function(data) {
    emitter.emit('data', data);
  });

  cmd.on('error', function(err) {
    emitter.emit('error', err);
  });

  cmd.on('close', function(code) {
    emitter.emit('close', code);
  });
}
