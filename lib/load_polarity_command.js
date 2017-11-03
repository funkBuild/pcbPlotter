class LoadPolarityCommand {
  static canProcess(line){
    let regexp = /^%LP[CD]/i;

    return regexp.test(line);
  }

  static process(ctx, line) {
    let parserRegexp = /^%LP(\w)/i;
    let matches = parserRegexp.exec(line);

    ctx.state.darkPolarity = (matches[1] == 'D');
  }
}

module.exports = LoadPolarityCommand;
