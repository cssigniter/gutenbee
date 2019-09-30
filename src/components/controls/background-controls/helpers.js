export const getBackgroundImageStyle = settings => {
  const { url, repeat, size, position, attachment } = settings;

  return {
    backgroundImage: url ? `url(${url})` : undefined,
    backgroundRepeat: repeat ? repeat : undefined,
    backgroundSize: size ? size : undefined,
    backgroundPosition: position ? position : undefined,
    backgroundAttachment: attachment ? attachment : undefined,
  };
};
