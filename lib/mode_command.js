
class ModeCommand {
  static canProcess(line){
    let regexp = /^%MO/i;

    return regexp.test(line);
  }

  static process(line) {
    let parserRegexp = /^%MO(\w\w)/i;
    let matches = parserRegexp.exec(line);

    if(matches[1] == 'MM')
      return new ModeCommand({mode: 'mm'})
    else if(matches[1] == 'in')
      return new ModeCommand({mode: 'in'})
    else throw new Error('Mode command invalid');
  }

  constructor(props) {
    this.properties = props;
  }
}

module.exports = ModeCommand;
