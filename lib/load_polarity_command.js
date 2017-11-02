
class LoadPolarityCommand {
  static canProcess(line){
    let regexp = /^%LP[CD]/i;

    return regexp.test(line);
  }

  static process(ctx, line) {
    let parserRegexp = /^%LP(\w)/i;
    let matches = parserRegexp.exec(line);

    return new LoadPolarityCommand({
      dark: (matches[1] == 'D')
    })
  }

  constructor(props) {
    this.properties = props;
  }
}

module.exports = LoadPolarityCommand;
