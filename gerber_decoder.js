const CommentCommand = require('./lib/comment_command');
const FormatStatementCommand = require('./lib/format_statement_command');
const ModeCommand = require('./lib/mode_command');
const LoadPolarityCommand = require('./lib/load_polarity_command');
const LineInterpolationModeCommand = require('./lib/line_interpolation_mode_command');
const ApertureDefinitionCommand = require('./lib/aperture_definition_command.js');
const SetCurrentApertureCommand = require('./lib/set_current_aperture_command.js');
const InterpolateOperation = require('./lib/interpolate_operation.js');
const MoveOperation = require('./lib/move_operation.js');
const FlashOperation = require('./lib/flash_operation.js');

const commandDict = [
  CommentCommand,
  FormatStatementCommand,
  ModeCommand,
  LoadPolarityCommand,
  LineInterpolationModeCommand,
  ApertureDefinitionCommand,
  SetCurrentApertureCommand,
  InterpolateOperation,
  MoveOperation,
  FlashOperation
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
    this.state = {
      position: {
        x: 0,
        y: 0
      },
      appertures: {},
      mode: 'MM',
      currentAperture: 'D01',
      interpolationMode: 'linear'
    };
  }

  decode() {
    this._lines.forEach( line => {
      this.decodeLine(line);
    });
  }

  decodeLine(line) {
    let cmd;
    let wasProcessed = false;

    for(let i = 0; i < commandDict.length; i++) {
      if(commandDict[i].canProcess(line) && (cmd = commandDict[i].process(this.state, line))) {
        this.commands.push(cmd);
        wasProcessed = true;
        break;
        //console.dir(this.state);
      }
    }
    if(!wasProcessed) console.dir(`Unprocessed line :: ${line}`);
  }
}


module.exports = GerberDecoder;
