
class LineInterpolationModeCommand {
  static canProcess(line){
    let regexp = /^G01/i;

    return regexp.test(line);
  }

  static process(ctx, line) {
    ctx.interpolationMode = 'linear';
    return new LineInterpolationModeCommand({})
  }

  constructor(props) {
    this.properties = props;
  }
}

module.exports = LineInterpolationModeCommand;
