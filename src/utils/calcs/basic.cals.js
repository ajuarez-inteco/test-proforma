function isNumeric(num) {
  return (
    (typeof num === 'number'
    || (typeof num === 'string' && num.trim() !== ''))
    && !Number.isNaN(num)
  );
}

function toNumeric(num) {
  return num * 1;
}

export { isNumeric, toNumeric };
