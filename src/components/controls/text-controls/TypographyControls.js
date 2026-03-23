import PropTypes from 'prop-types';
import {
  __experimentalTextTransformControl as TextTransformControl,
  __experimentalLetterSpacingControl as LetterSpacingControl,
  __experimentalTextDecorationControl as TextDecorationControl,
  LineHeightControl,
} from 'wp.blockEditor';
import classNames from 'classnames';

import FontSizePickerLabel from './FontSizePickerLabel';

const propTypes = {
  className: PropTypes.string,
  attributes: PropTypes.shape({
    fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lineHeight: PropTypes.string,
    letterSpacing: PropTypes.string,
    textTransform: PropTypes.string,
    textDecoration: PropTypes.string,
  }).isRequired,
  onFontSizeChange: PropTypes.func,
  onLineHeightChange: PropTypes.func,
  onLetterSpacingChange: PropTypes.func,
  onTextDecorationChange: PropTypes.func,
  onTextTransformChange: PropTypes.func,
  label: PropTypes.node,
};

const TypographyControls = ({
  className,
  attributes,
  onFontSizeChange,
  onLineHeightChange,
  onLetterSpacingChange,
  onTextDecorationChange,
  onTextTransformChange,
  label,
}) => {
  const {
    fontSize,
    lineHeight,
    letterSpacing,
    textTransform,
    textDecoration,
  } = attributes;

  return (
    <div className={classNames('gutenbee-typography-controls', className)}>
      {onFontSizeChange && (
        <div className="gutenbee-typography-controls-row-full">
          <FontSizePickerLabel
            label={label}
            value={
              fontSize !== undefined && fontSize !== '' && fontSize != null
                ? fontSize
                : undefined
            }
            onChange={value => {
              onFontSizeChange(value);
            }}
          />
        </div>
      )}

      {(onLineHeightChange || onLetterSpacingChange) && (
        <div className="gutenbee-typography-controls-row">
          {onLineHeightChange && (
            <LineHeightControl
              value={lineHeight}
              onChange={value => {
                onLineHeightChange(value);
              }}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          )}

          {onLetterSpacingChange && (
            <LetterSpacingControl
              value={letterSpacing}
              onChange={value => {
                onLetterSpacingChange(value);
              }}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          )}
        </div>
      )}

      {(onTextDecorationChange || onTextTransformChange) && (
        <div className="gutenbee-typography-controls-row">
          {onTextDecorationChange && (
            <TextDecorationControl
              value={textDecoration || undefined}
              onChange={value => {
                // If clicking the same value, deselect by passing undefined
                onTextDecorationChange(
                  value === textDecoration ? undefined : value,
                );
              }}
            />
          )}

          {onTextTransformChange && (
            <TextTransformControl
              value={textTransform || undefined}
              onChange={value => {
                // If clicking the same value, deselect by passing undefined
                onTextTransformChange(
                  value === textTransform ? undefined : value,
                );
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

TypographyControls.propTypes = propTypes;

export default TypographyControls;
