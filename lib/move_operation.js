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


    let xPos = CoordinateParser(ctx.format.x, xPosString);
    let yPos = CoordinateParser(ctx.format.y, yPosString);

    console.log(`Move from (${ctx.position.x}, ${ctx.position.y}) to (${xPos}, ${yPos})`);

    ctx.position.x = xPos;
    ctx.position.y = yPos;

    return new MoveOperation({})
  }

  constructor(props) {
    this.properties = props;
  }
}

module.exports = MoveOperation;
