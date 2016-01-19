'use strict';

var path = require('path');
var spawn = require('child_process').spawn;
var _ = require('lodash');

module.exports = clipMap;

function clipMap(raster, clipped, boundary, callback) {
  var params = _(boundary)
    .unshift('-te')
    .push(raster)
    .push(clipped)
    .value();

  var cmd = spawn('gdalwarp', params);

  cmd.on('error', function(err) {
    return callback(err);
  });

  cmd.on('close', function(code) {
    if (code !== 0) {
      return callback(code);
    }

    return callback(null, clipped);
  });
}
