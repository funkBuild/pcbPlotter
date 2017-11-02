const CoordinateParser = require('./coordinate_parser');

class FlashOperation {
  static canProcess(line){
    let regexp = /D03\*$/i;

    return regexp.test(line);
  }

  static process(ctx, line) {
    let parserRegexp = /X(-?\d+)Y([\-\+]?\d+)D03\*$/i;
    let matches = parserRegexp.exec(line);

    let xPosString = matches[1];
    let yPosString = matches[2];


    let xPos = CoordinateParser(ctx.format.x, xPosString);
    let yPos = CoordinateParser(ctx.format.y, yPosString);

    console.log(`Flash Operation at (${xPos}, ${yPos})`);

    return new FlashOperation({})
  }

  constructor(props) {
    this.properties = props;
  }
}

module.exports = FlashOperation;
