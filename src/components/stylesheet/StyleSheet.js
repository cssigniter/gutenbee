import PropTypes from 'prop-types';

import {
  defaultGenerateStyles,
  defaultGetCSSRule,
  defaultGetStylesArrayFromChildren,
  getFlattenedRulesBreakpoint,
  stylesArrayIsEmpty,
} from './helpers';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  id: PropTypes.string,
};

const StyleSheet = ({ id = '', children }) => {
  const stylesArray = defaultGetStylesArrayFromChildren({
    id,
    children,
    getCSSRule: defaultGetCSSRule,
    mapper: getFlattenedRulesBreakpoint,
  });

  if (stylesArrayIsEmpty(stylesArray)) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{ __html: defaultGenerateStyles(stylesArray) }}
    />
  );
};

StyleSheet.propTypes = propTypes;

export default StyleSheet;
