const formatNumber = (
  number,
  separator = ',',
  decimal = '.',
  prefix,
  suffix,
) => {
  const parts = number.toString().split(decimal);

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return `${prefix || ''}${parts.join(decimal)}${suffix || ''}`;
};

export default formatNumber;
