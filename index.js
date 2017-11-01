const fs = require('fs');
const GerberDecoder = require('./gerber_decoder');

let gerberData = fs.readFileSync('./test_files/test.gbr').toString();

GerberDecoder.processFile(gerberData);
