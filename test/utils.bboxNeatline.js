'use strict';

var path = require('path');
var expect = require('chai').expect;
var bboxNeatline = require('../lib/utils/bboxNeatline');

var pdfPath = path.join(__dirname, './fixtures/test_topo_a.pdf');

describe('Utility - bboxNeatline', function() {

  it('should get the bounding box from the gdalinfo of the geopdf', function(done) {
    bboxNeatline(pdfPath, function(err, bbox) {
      expect(bbox).to.be.a('array');
      expect(bbox).to.have.length(4);
      expect(bbox[0]).to.be.lessThan(bbox[2]);
      expect(bbox[1]).to.be.lessThan(bbox[3]);
      done(err);
    });
  });
});
