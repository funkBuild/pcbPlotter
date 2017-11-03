class ModeCommand {
  static canProcess(line){
    let regexp = /^%MO/i;

    return regexp.test(line);
  }

  static process(ctx, line) {
    let parserRegexp = /^%MO(\w\w)/i;
    let matches = parserRegexp.exec(line);

    if(matches[1] == 'MM') {
      ctx.state.mode = 'mm';
    } else if(matches[1] == 'IN') {
      ctx.state.mode = 'in';
    } else
      throw new Error('Mode command invalid');
  }
}

module.exports = ModeCommand;
