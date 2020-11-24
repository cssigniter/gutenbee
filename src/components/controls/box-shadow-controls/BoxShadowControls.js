import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { SelectControl, RangeControl } from 'wp.components';

import PopoverColorControl from '../advanced-color-control/PopoverColorControl';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
};

const BoxShadowControls = ({
  attributes,
  setAttributes,
  attributePrefix = 'block',
}) => {
  const type = attributePrefix
    ? attributes[`${attributePrefix}BoxShadowType`]
    : attributes.boxShadowType;
  const color = attributePrefix
    ? attributes[`${attributePrefix}BoxShadowColor`]
    : attributes.boxShadowColor;
  const width = attributePrefix
    ? attributes[`${attributePrefix}BoxShadowWidth`]
    : attributes.boxShadowWidth;
  const spread = attributePrefix
    ? attributes[`${attributePrefix}BoxShadowSpread`]
    : attributes.boxShadowSpread;
  const left = attributePrefix
    ? attributes[`${attributePrefix}BoxShadowLeft`]
    : attributes.boxShadowLeft;
  const top = attributePrefix
    ? attributes[`${attributePrefix}BoxShadowTop`]
    : attributes.boxShadowTop;

  return (
    <Fragment>
      <SelectControl
        label={__('Box Shadow')}
        value={type}
        options={[
          { value: 'none', label: __('None') },
          { value: 'outset', label: __('Normal (Outset)') },
          { value: 'inset', label: __('Inset') },
        ]}
        onChange={value => {
          if (attributePrefix) {
            setAttributes({ [`${attributePrefix}BoxShadowType`]: value });
          } else {
            setAttributes({ boxShadowType: value });
          }
        }}
      />

      {type !== 'none' && !!type && (
        <Fragment>
          <PopoverColorControl
            value={color}
            defaultValue=""
            label={__('Box Shadow Color')}
            disableAlpha={false}
            onChange={value => {
              if (attributePrefix) {
                setAttributes({ [`${attributePrefix}BoxShadowColor`]: value });
              } else {
                setAttributes({ boxShadowColor: value });
              }
            }}
          />

          <RangeControl
            label={__('Box Shadow Width (px)')}
            min={0}
            max={100}
            value={width}
            onChange={value => {
              if (attributePrefix) {
                setAttributes({ [`${attributePrefix}BoxShadowWidth`]: value });
              } else {
                setAttributes({ boxShadowWidth: value });
              }
            }}
            step={1}
            initialPosition={7}
            allowReset
          />

          <RangeControl
            label={__('Box Shadow Spread (px)')}
            min={0}
            max={100}
            value={spread}
            onChange={value => {
              if (attributePrefix) {
                setAttributes({ [`${attributePrefix}BoxShadowSpread`]: value });
              } else {
                setAttributes({ boxShadowSpread: value });
              }
            }}
            step={1}
            initialPosition={0}
            allowReset
          />

          <RangeControl
            label={__('Box Shadow Left (px)')}
            min={-100}
            max={100}
            value={left}
            onChange={value => {
              if (attributePrefix) {
                setAttributes({ [`${attributePrefix}BoxShadowLeft`]: value });
              } else {
                setAttributes({ boxShadowLeft: value });
              }
            }}
            step={1}
            initialPosition={0}
            allowReset
          />

          <RangeControl
            label={__('Box Shadow Top (px)')}
            min={-100}
            max={100}
            value={top}
            onChange={value => {
              if (attributePrefix) {
                setAttributes({ [`${attributePrefix}BoxShadowTop`]: value });
              } else {
                setAttributes({ boxShadowTop: value });
              }
            }}
            step={1}
            initialPosition={0}
            allowReset
          />
        </Fragment>
      )}
    </Fragment>
  );
};

BoxShadowControls.propTypes = propTypes;

export default BoxShadowControls;
