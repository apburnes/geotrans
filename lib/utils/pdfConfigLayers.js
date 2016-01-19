'use strict';

var _ = require('lodash');
var topoTypes = require('../settings/topoTypes');

module.exports = configLayers;

function configLayers(options) {
  var topoType = 'all';
  var layers = topoTypes[topoType];
  var givenLayers = getLayers(options.l);
  var compressed = createOpts('compress', options.c || 'none');
  var zLevel = createOpts('zlevel', options.z || '6');
  var formatted = ['-of', options.f || 'GTiff'];

  if (Object.keys(topoTypes).indexOf(options.t) !== -1) {
    topoType = options.t;
  }

  if (options.t && !options.l) {
    layers = topoTypes[topoType];
  }

  if (options.l && !options.t) {
    layers = givenLayers;
  }

  if (options.l && options.t) {
    layers = _.union(topoTypes[topoType], givenLayers);
  }

  var joined = ['--config', 'GDAL_PDF_LAYERS', layers.join(',')];

  return concatOptions(formatted, compressed, zLevel, joined);
}

function getLayers(stringList) {
  stringList = stringList || '';

  function clean(item) {
    var layer = _.trim(item).toLowerCase();
    return topoTypes.layerKey[layer];
  }

  return _.compact(_.map(stringList.split(','), clean));
}

function createOpts(key, value) {
  var setOpt = key.concat('=',value).toUpperCase();
  return ['-co', setOpt];
}

function concatOptions() {
  var args = Array.prototype.slice.call(arguments);
  return _.flattenDeep(args);
}
