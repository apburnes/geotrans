'use strict';

var path = require('path');
var EventEmitter = require('events').EventEmitter;
var expect = require('chai').expect;

var pdf2tif = require('../lib/pdf2tif');
var pdf = path.join(__dirname, './fixtures/test_topo_a.pdf');
var pdfOut = path.join(__dirname, './fixtures/test_topo_a.tif');

describe.skip('pdf2tif translation',function() {
  it('should build a temp raster to be clipped', function() {
    var tempFile = pdf2tif([pdf, pdfOut], {x: true}, 'test');
    console.log(tempFile);
  });
});
