const CoordinateParser = require('./coordinate_parser');

class MoveOperation {
  static canProcess(line){
    let regexp = /D02\*$/i;

    return regexp.test(line);
  }

  static process(ctx, line) {
    let parserRegexp = /X(-?\d+)Y([\-\+]?\d+)D02\*$/i;
    let matches = parserRegexp.exec(line);

    let xPosString = matches[1];
    let yPosString = matches[2];


    let xPos = CoordinateParser(ctx.state.format.x, xPosString);
    let yPos = CoordinateParser(ctx.state.format.y, yPosString);

    console.log(`Move from (${ctx.state.position.x}, ${ctx.state.position.y}) to (${xPos}, ${yPos})`);

    ctx.state.position.x = xPos;
    ctx.state.position.y = yPos;

    return new MoveOperation({})
  }

  constructor(props) {
    this.properties = props;
  }
}

module.exports = MoveOperation;
