const CommentCommand = require('./lib/comment_command');
const FormatStatementCommand = require('./lib/format_statement_command');
const ModeCommand = require('./lib/mode_command');
const LoadPolarityCommand = require('./lib/load_polarity_command');
const LineInterpolationModeCommand = require('./lib/line_interpolation_mode_command');
const ApertureDefinitionCommand = require('./lib/aperture_definition_command.js');

const commandDict = [
  CommentCommand,
  FormatStatementCommand,
  ModeCommand,
  LoadPolarityCommand,
  LineInterpolationModeCommand,
  ApertureDefinitionCommand
]

class GerberDecoder {
  static processFile(data) {
    let decoder = new GerberDecoder(data);
    decoder.decode();

    return decoder;
  }

  constructor(data) {
    this._lines = data.split('\n');
    this.commands = [];
  }

  decode() {
    this._lines.forEach( line => {
      this.decodeLine(line);
    });

    console.dir(this.commands);
  }

  decodeLine(line) {
    let cmd;

    for(let i = 0; i < commandDict.length; i++) {
      if(commandDict[i].canProcess(line) && (cmd = commandDict[i].process(line))) {
        this.commands.push(cmd);
      }
    }
  }
}


module.exports = GerberDecoder;
