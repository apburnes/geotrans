'use strict';

var expect = require('chai').expect;
var path = require('path');

var clipRaster = require('../lib/utils/clipRaster');
var bbox = require('../lib/utils/bboxNeatline');

var pdf = path.join(__dirname, './fixtures/test_topo_a.pdf');
var outRaster = path.join(__dirname, './fixtures/test_clip_a.tif');
var bounding = [];

describe.skip('clip raster', function() {
  var bndry;

  before(function(done) {
    bbox(pdf, function(err, arr) {
      bndry = arr;
      done(err);
    });
  });

  after(function() {
    bndry = null;
  });

  it('should clip raster', function(done) {
    clipRaster(pdf, outRaster, bndry, function(err, out) {
      expect(out).to.equal(outRaster);
      done(err);
    });
  });
});
