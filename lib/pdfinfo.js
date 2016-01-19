'use strict';

var spawn = require('child_process').spawn;

module.exports = pdfinfo;

function pdfinfo(input, options, emitter) {
  var info = '';
  var cmd = spawn('gdalinfo', [input[0], '-mdd', 'LAYERS']);

  cmd.stderr.on('data', function(data) {
    emitter.emit('warning', data.toString());
  });

  cmd.stdout.on('data', function(data) {
    info = data.toString();
    emitter.emit('data', data.toString());
  });

  cmd.on('error', function(err) {
    emitter.emit('error', err);
  });

  cmd.on('close', function(code) {
    emitter.emit('close', info);
  });
}
