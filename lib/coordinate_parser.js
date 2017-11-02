module.exports = (format, posString) => {
  let isPositive = true;
  let integer, decimal, value;

  if(posString[0] == '+') {
    posString = posString.slice(1);
  } else if( posString[0] == '-') {
    posString = posString.slice(1);
    isPositive = false;
  }
  
  decimal = posString.slice(posString.length - format.decimalPositions, posString.length);

  if( posString.length - format.decimalPositions > 0 )
    integer = posString.slice(0, posString.length - format.decimalPositions);

  value = Number(integer) + Number(decimal) / Math.pow(10, format.decimalPositions);
  if(!isPositive) value = value * -1;

  return value;
}
