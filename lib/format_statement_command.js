
class FormatStatementCommand {
  static canProcess(line){
    let regexp = /^%FSLA/i;

    return regexp.test(line);
  }

  static process(line) {
    let parserRegexp = /^%FSLAX(\d)(\d)Y(\d)(\d)/i;
    let matches = parserRegexp.exec(line);

    return new FormatStatementCommand({
      x: {
        integerPositions: matches[1],
        decimalPositions: matches[2]
      },
      y: {
        integerPositions: matches[3],
        decimalPositions: matches[4]
      }
    })
  }

  constructor(props) {
    this.properties = props;
  }
}

module.exports = FormatStatementCommand;
