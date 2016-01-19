'use strict';

var _ = require('lodash');
var topoTypes = require('../settings/topoTypes');

module.exports = clipConfig;

function clipConfig(config) {
  var lyrsIdx = config.length - 1;
  var preConf = _.slice(config, 0, lyrsIdx);
  var layers = _.slice(config, lyrsIdx)[0].split(',');
  var diffLayers = _.difference(layers, topoTypes['clipping']);

  return preConf.concat(diffLayers.join(','));
}
