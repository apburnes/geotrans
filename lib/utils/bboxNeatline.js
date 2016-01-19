'use strict';

var path = require('path');
var spawn = require('child_process').spawn;
var _ = require('lodash');

module.exports = bboxNeatline;

function bboxNeatline(pdf, callback) {
  var bbox;
  var pdfPath = path.resolve(pdf);

  var info = spawn('gdalinfo', [pdfPath,'-mdd', 'NEATLINE']);
  var grep = spawn('grep', ['NEATLINE']);

  info.stderr.on('data', function(err) {
    //console.log('GDALINFO STDERR: ' + err.toString());
  });

  info.stdout.on('data', function(data) {
    grep.stdin.write(data);
  });

  info.on('error', function(err) {
    return callback(err);
  });

  info.on('close', function(code) {
    grep.stdin.end();
  });

  grep.on('error', function(err) {
    return callback(err);
  });

  grep.stderr.on('data', function(err) {
    //console.log('GREP STDERR: ' + err);
  });

  grep.stdout.on('data', function(data) {
    bbox = buildBbox(data.toString());
  });

  grep.on('close', function(code) {
    callback(null, bbox);
  })
}

function buildBbox(text) {
  var trimmed = _.trimRight(_.trimLeft(_.trim(text), 'NEATLINE=POLYGON (('), '))');
  var coords = trimmed.split(',');

  var boxCorners = _.map(coords, function(coord, idx) {
    var xy = coord.split(' ');
    return { id: idx, x: xy[0], y: xy[1] };
  });

  var xMax = _.max(boxCorners, 'x').x - 150;
  var xMin = _.min(boxCorners, 'x').x + 150;
  
  var yMax = _.max(boxCorners, 'y').y - 150;
  var yMin = _.min(boxCorners, 'y').y + 150;

  return [xMin, yMin, xMax, yMax];
}
