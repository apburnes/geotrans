'use strict';

var EventEmitter = require('events').EventEmitter;
var requireDir = require('require-dir');
var geoTrans = requireDir('./lib');

function eventHandler(func, params, options, callback) {
  var emitter = new EventEmitter();

  emitter.on('error', function(err) {
    return callback(new Error(err));
  });

  emitter.on('close', function(data) {
    return callback(null, data);
  });

  return func(params, options, emitter);
}

exports.pdfinfo = function(inFile, callback) {
  var opts = {};
  return eventHandler(geoTrans.pdfinfo, [inFile], opts, callback);
}

exports.pdf2tif = function(inFile, outFile, options, callback) {
  var opts = options || {};
  var params = [inFile, outFile];

  return eventHandler(geoTrans.pdf2tif, params, opts, callback);
}
