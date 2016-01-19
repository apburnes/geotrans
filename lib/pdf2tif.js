'use strict';

var fs = require('fs');
var path = require('path');
var EventEmitter = require('events').EventEmitter;
var spawn = require('child_process').spawn;
var _ = require('lodash');

var topoTypes = require('./settings/topoTypes');
var configLayers = require('./utils/pdfConfigLayers');
var clipConfig = require('./utils/clipConfig');
var bboxNeatline = require('./utils/bboxNeatline');
var clipRaster = require('./utils/clipRaster');

module.exports = pdf2tif;

function pdf2tif(params, options, emitter) {
  options = options || {};
  var config = configLayers(options);

  if (options.x) {
    return clipMap(params, config, emitter);
  }

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

function clipMap(params, config, emitter) {
  var subEvent = new EventEmitter();
  var inRaster = params[0];
  var outRaster = params[params.length - 1];
  var tempRaster = createTemp(outRaster);
  var reConfig = clipConfig(config);
  var cmdArgs = [inRaster, tempRaster].concat(reConfig);

  subEvent.on('error', function(err) {
    emitter.emit('error', err);
  });

  subEvent.on('close', function() {
    bboxNeatline(inRaster, function(err, bbox) {
      if (err) {
        return emitter.emit('error', err);
      }

      clipRaster(tempRaster, outRaster, bbox, function(err, newFile) {
        if (err) {
          return emitter.emit('error', err);
        }
        fs.unlinkSync(tempRaster);
        emitter.emit('close', newFile);
      });
    });
  });

  translate(cmdArgs, subEvent);
}

function createTemp(filepath) {
  var baseName = path.basename(filepath);
  var dirName = path.dirname(filepath);

  return path.join(dirName, Date.now() + '_' + baseName);
}
