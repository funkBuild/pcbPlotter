class ApertureDefinitionCommand {
  static canProcess(line){
    let regexp = /^%AD/i;

    return regexp.test(line);
  }

  static process(ctx, line) {
    let parserRegexp = /%AD(D\d+)(\w)(,.+)?\*%/i;
    let matches = parserRegexp.exec(line);

    console.dir(matches);

    let props = {
      aperture: matches[1],
      template: matches[2]
    };

    if(matches[3] && matches[3].length > 0)
      props.modifiers = ApertureDefinitionCommand.parseModifiers(props.template, matches[3]);

    return new ApertureDefinitionCommand(props)
  }

  static parseModifiers(template, modifierLine) {
    let modifiers = modifierLine.slice(1).split("X");
    let modifierProps = {};

    switch(template) {
      case 'C':
        modifierProps.diameter = Number(modifiers[0]) || 0;
        modifierProps.holeDiameter = Number(modifiers[1]) || 0;
        break;
      case 'R':
      case 'O':
        modifierProps.xSize = Number(modifiers[0]) || 0;
        modifierProps.ySize = Number(modifiers[1]) || 0;
        modifierProps.holeDiameter = Number(modifiers[2]) || 0;
        break;
      case 'P':
        modifierProps.outerDiameter = Number(modifiers[0]) || 0;
        modifierProps.numberOfVertices = Number(modifiers[1]) || 0;
        modifierProps.rotationAngle = Number(modifiers[2]) || 0;
        modifierProps.holeDiameter = Number(modifiers[2]) || 0;
        break;
    }

    return modifierProps;
  }

  constructor(props) {
    this.properties = props;
  }
}

module.exports = ApertureDefinitionCommand;
