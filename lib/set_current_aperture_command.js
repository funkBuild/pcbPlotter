class SetCurrentApertureCommand {
  static canProcess(line){
    let regexp = /^D\d\d\*/i;

    return regexp.test(line);
  }

  static process(ctx, line) {
    let parserRegexp = /^(D\d\d)\*/i;
    let matches = parserRegexp.exec(line);

    let props = {
      aperture: matches[1]
    };

    ctx.currentAperture = props.aperture;
    return new SetCurrentApertureCommand(props)
  }

  constructor(props) {
    this.properties = props;
  }
}

module.exports = SetCurrentApertureCommand;
