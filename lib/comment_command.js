
class CommentCommand {
  static canProcess(line){
    let regexp = /^G04/i;

    return regexp.test(line);
  }

  static process(line) {
    let parserRegexp = /^G04 (?:#@!\s)?([^\*]*)/i;
    let match = parserRegexp.exec(line);
    console.log(`Comment :: ${match[1]}`);
  }
}

module.exports = CommentCommand;
