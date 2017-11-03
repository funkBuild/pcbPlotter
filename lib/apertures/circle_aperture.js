

class CircleAperture {
  constructor(modifierString) {
    let modifiers = modifierString.slice(1).split("X");

    this.diameter = Number(modifiers[0]) || 0;
    this.holeDiameter = Number(modifiers[1]) || 0;
  }
}

module.exports = CircleAperture;
