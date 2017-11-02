
class FormatStatementCommand {
  static canProcess(line){
    let regexp = /^%FSLA/i;

    return regexp.test(line);
  }

  static process(ctx, line) {
    let parserRegexp = /^%FSLAX(\d)(\d)Y(\d)(\d)/i;
    let matches = parserRegexp.exec(line);

    let props = {
      x: {
        integerPositions: Number(matches[1]),
        decimalPositions: Number(matches[2])
      },
      y: {
        integerPositions: Number(matches[3]),
        decimalPositions: Number(matches[4])
      }
    };

    ctx.format = props;

    return new FormatStatementCommand()
  }

  constructor(props) {
    this.properties = props;
  }
}

module.exports = FormatStatementCommand;
