'use strict';

var expect = require('chai').expect;
var configLayers = require('../lib/utils/pdfConfigLayers');
var clipConfig = require('../lib/utils/clipConfig');
var topoTypes = require('../lib/settings/topoTypes');
var specificLayers = require('./fixtures/specificLayers');

describe('pdf configure layers', function() {
  it('should default to all layers when given undefined layers', function() {
    var options = {};
    var layers = configLayers(options);
    var selected = layers[layers.length - 1].split(',');

    expect(selected).to.eql(topoTypes['all']);
  });

  it('should choose the terrain topo', function() {
    var options = {t: 'terrain'};
    var layers = configLayers(options);
    var selected = layers[layers.length - 1].split(',');

    expect(selected).to.eql(topoTypes['terrain']);
  });

  it('should choose default format of geotiff', function() {
    var options = {};
    var layers = configLayers(options);
    var format = layers[1];

    expect(format).to.equal('GTiff');
  });

  it('should choose layers from key', function() {
    var options = {l: 'map_collar,Roads, shaded_Relief, imagery, orthoimagery'};
    var layers = configLayers(options);
    var selected = layers[layers.length - 1];

    expect(selected).to.be.a('string');
  });

  it('should choose terrain plus added layers', function() {
    var options = {t: 'terrain', l:'ortho_imagery, shaded_relief'};
    var layers = configLayers(options);
    var selected = layers[layers.length - 1].split(',');

    expect(selected).to.eql(topoTypes['terrain'].concat('Images.Orthoimage'));
  });

  it('should remove map collar for clipping', function() {
    var options = {t: 'terrain', l:'ortho_imagery, shaded_relief'};
    var config = configLayers(options);
    var clipped = clipConfig(config);

    expect(clipped).to.not.eql(config);
  });

  it('should create config with default "NONE" compression', function() {
    var options = {};
    var config = configLayers(options);
    var indexOf = config.indexOf('COMPRESS=NONE');

    expect(indexOf).to.not.equal(-1);
  });

  it('should create config with "DEFLATE" compression', function() {
    var options = {c: 'deflate'};
    var config = configLayers(options);
    var indexOf = config.indexOf('COMPRESS=DEFLATE');

    expect(indexOf).to.not.equal(-1);
  });

  it('should create config with "JPEG" compression', function() {
    var options = {c: 'jpeg'};
    var config = configLayers(options);
    var indexOf = config.indexOf('COMPRESS=JPEG');

    expect(indexOf).to.not.equal(-1);
  });

  it('should create config with "ZLEVEL 9" compression', function() {
    var options = {z: 9};
    var config = configLayers(options);
    var indexOf = config.indexOf('ZLEVEL=9');

    expect(indexOf).to.not.equal(-1);
  });

  it('should create config with "ZLEVEL 6" default compression', function() {
    var options = {};
    var config = configLayers(options);
    var indexOf = config.indexOf('ZLEVEL=6');

    expect(indexOf).to.not.equal(-1);
  });
});
