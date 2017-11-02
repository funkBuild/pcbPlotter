
class CommentCommand {
  static canProcess(line){
    let regexp = /^G04/i;

    return regexp.test(line);
  }

  static process(ctx, line) {
    let parserRegexp = /^G04 (?:#@!\s)?([^\*]*)/i;
    let match = parserRegexp.exec(line);

    return true;
  }
}

module.exports = CommentCommand;
