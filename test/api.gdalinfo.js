'use strict';

var path = require('path');
var expect = require('chai').expect;
var geoTrans = require('../');
var pdfinfo = geoTrans.pdfinfo;

var pdf = path.join(__dirname, './fixtures/test_topo_a.pdf');
var notPdf = path.join(__dirname, './fixtures/not_topo.pdf');

describe('pdfinfo', function() {
  it('should return metadata info for pdf', function(done) {
    pdfinfo(pdf, function(err, data) {
      expect(data).to.be.a('string');
      done(err);
    });
  });

  it('should return error with invalid pdf', function(done) {
    pdfinfo(notPdf, function(err, data) {
      expect(data).to.be.empty;
      done();
    });
  });
});
