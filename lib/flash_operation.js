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

    let xPos = CoordinateParser(ctx.state.format.x, xPosString);
    let yPos = CoordinateParser(ctx.state.format.y, yPosString);
    let aperture = ctx.state.apertures[ ctx.state.currentAperture ];

    ctx.updateBoundingBox(xPos, yPos);

    ctx.drawingOperations.push(
      new FlashOperation(aperture, xPos, yPos)
    );
  }

  constructor(aperture, xPos, yPos) {
    this.aperture = aperture;
    this.xPos = xPos;
    this.yPos = yPos;
  }
}

module.exports = FlashOperation;
