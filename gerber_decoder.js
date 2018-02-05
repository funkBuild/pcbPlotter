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

const DrawingCanvas = require('./lib/drawing_canvas');

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
    this.state = {
      position: {
        x: 0,
        y: 0
      },
      boundingBox: {
        topRight: {
          x: 0,
          y: 0
        },
        bottomLeft: {
          x: 0,
          y: 0
        }
      },
      apertures: {},
      mode: 'MM',
      currentAperture: 'D01',
      interpolationMode: 'linear'
    };
    this.drawingOperations = [];
  }

  updateBoundingBox(x, y) {
    console.log(`x: ${x}, y: ${y}`);
    if(x >= this.state.boundingBox.topRight.x) {
      this.state.boundingBox.topRight.x = x;
    }
    if(y >= this.state.boundingBox.topRight.y) {
      this.state.boundingBox.topRight.y = y;
    }
    if(x <= this.state.boundingBox.bottomLeft.x){
      this.state.boundingBox.bottomLeft.x = x;
    }
    if(y <= this.state.boundingBox.bottomLeft.y) {
      this.state.boundingBox.bottomLeft.y = y;
    }
  }

  decode() {
    this._lines.forEach( line => {
      this.decodeLine(line);
    });

    console.dir(this.drawingOperations);
    this.drawingCanvas = DrawingCanvas.create(this.state.boundingBox);
  }

  decodeLine(line) {
    let cmd;

    for(let i = 0; i < commandDict.length; i++) {
      if(commandDict[i].canProcess(line) ) {
        commandDict[i].process(this, line)
        break;
      }
    }
  }
}


module.exports = GerberDecoder;
