export const getBorderCSSValue = ({ attributes, prefix = 'block' }) => {
  const color = prefix
    ? attributes[`${prefix}BorderColor`]
    : attributes.borderColor;
  const width = prefix
    ? attributes[`${prefix}BorderWidth`]
    : attributes.borderWidth;
  const style = prefix
    ? attributes[`${prefix}BorderStyle`]
    : attributes.borderStyle;
  const radius = prefix
    ? attributes[`${prefix}BorderRadius`]
    : attributes.borderRadius;

  if (style === 'none') {
    return {
      borderColor: undefined,
      borderStyle: undefined,
      borderWidth: undefined,
      borderRadius: radius != null ? `${radius}px` : undefined,
    };
  }

  return {
    borderColor: color || undefined,
    borderStyle: style === 'none' || !style ? undefined : style,
    borderWidth: width != null ? `${width}px` : undefined,
    borderRadius: radius != null ? `${radius}px` : undefined,
  };
};
