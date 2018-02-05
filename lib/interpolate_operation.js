const CoordinateParser = require('./coordinate_parser');

class InterpolateOperation {
  static canProcess(line){
    let regexp = /D01\*$/i;

    return regexp.test(line);
  }

  static process(ctx, line) {
    let parserRegexp = /X(-?\d+)Y([\-\+]?\d+)D01\*$/i;
    let matches = parserRegexp.exec(line);

    let xPosString = matches[1];
    let yPosString = matches[2];


    let xPos = CoordinateParser(ctx.state.format.x, xPosString);
    let yPos = CoordinateParser(ctx.state.format.y, yPosString);
    let aperture = ctx.state.apertures[ ctx.state.currentAperture ] ;

    ctx.updateBoundingBox(xPos, yPos);

    // Draw the thing
    ctx.drawingOperations.push(
      new InterpolateOperation(aperture, ctx.state.position.x, ctx.state.position.y, xPos, yPos)
    );
    console.log(`Draw interpolate from (${ctx.state.position.x}, ${ctx.state.position.y}) to (${xPos}, ${yPos})`);

    ctx.state.position.x = xPos;
    ctx.state.position.y = yPos;
  }

  constructor(aperture, xStart, yStart, xEnd, yEnd) {
    this.aperture = aperture;
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
  }
}

module.exports = InterpolateOperation;
