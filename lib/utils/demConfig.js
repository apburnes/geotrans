'use strict';

var _ = require('lodash');

module.exports = configLayers;

function configLayers(options) {
  var compressed = createOpts('compress', options.c || 'none');
  var zLevel = createOpts('zlevel', options.z || '6');
  var formatted = ['-of', options.f || 'GTiff'];

  return concatOptions(formatted, compressed, zLevel);
}

function createOpts(key, value) {
  var setOpt = key.concat('=',value).toUpperCase();
  return ['-co', setOpt];
}

function concatOptions() {
  var args = Array.prototype.slice.call(arguments);
  return _.flattenDeep(args);
}
