const CircleAperture = require('./apertures/circle_aperture');

class ApertureDefinitionCommand {
  static canProcess(line){
    let regexp = /^%AD/i;

    return regexp.test(line);
  }

  static process(ctx, line) {
    let parserRegexp = /%AD(D\d+)(\w)(,.+)?\*%/i;
    let matches = parserRegexp.exec(line);

    let apertureCode = matches[1];
    let templateCode = matches[2];
    let apertureModifiers = matches[3];

    switch(templateCode) {
      case 'C':
        ctx.state.apertures[apertureCode] = new CircleAperture(apertureModifiers);
    }

    return new ApertureDefinitionCommand()
  }




  static parseModifiers(template, modifierLine) {
    let modifiers = modifierLine.slice(1).split("X");
    let modifierProps = {};

    switch(template) {
      case 'C':

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
