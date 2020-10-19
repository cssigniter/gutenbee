import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { SelectControl, RangeControl } from 'wp.components';

import PopoverColorControl from '../advanced-color-control/PopoverColorControl';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  attributePrefix: PropTypes.string,
  defaultValues: PropTypes.shape({
    color: PropTypes.string,
    radius: PropTypes.string,
    width: PropTypes.string,
  }),
};

const BorderControls = ({
  attributes,
  setAttributes,
  attributePrefix = 'block',
  defaultValues = {},
}) => {
  const color = attributePrefix
    ? attributes[`${attributePrefix}BorderColor`]
    : attributes.borderColor;
  const width = attributePrefix
    ? attributes[`${attributePrefix}BorderWidth`]
    : attributes.borderWidth;
  const style = attributePrefix
    ? attributes[`${attributePrefix}BorderStyle`]
    : attributes.borderStyle;
  const radius = attributePrefix
    ? attributes[`${attributePrefix}BorderRadius`]
    : attributes.borderRadius;

  return (
    <Fragment>
      <SelectControl
        label={__('Border')}
        value={style}
        options={[
          { value: 'none', label: __('None') },
          { value: 'solid', label: __('Solid') },
          { value: 'dotted', label: __('Dotted') },
          { value: 'dashed', label: __('Dashed') },
          { value: 'double', label: __('Double') },
          { value: 'groove', label: __('Groove') },
          { value: 'ridge', label: __('Ridge') },
        ]}
        onChange={value => {
          if (attributePrefix) {
            setAttributes({ [`${attributePrefix}BorderStyle`]: value });
          } else {
            setAttributes({ borderStyle: value });
          }
        }}
      />

      {style !== 'none' && !!style && (
        <Fragment>
          <PopoverColorControl
            value={color || '#000000'}
            defaultValue={defaultValues.color || '#000000'}
            label={__('Border color')}
            disableAlpha={false}
            onChange={value => {
              if (attributePrefix) {
                setAttributes({ [`${attributePrefix}BorderColor`]: value });
              } else {
                setAttributes({ borderColor: value });
              }
            }}
          />

          <RangeControl
            label={__('Border Width (px)')}
            min={0}
            max={100}
            value={width}
            onChange={value => {
              if (attributePrefix) {
                setAttributes({ [`${attributePrefix}BorderWidth`]: value });
              } else {
                setAttributes({ borderWidth: value });
              }
            }}
            step={1}
            initialPosition={defaultValues.width || 3}
            allowReset
          />
        </Fragment>
      )}

      <RangeControl
        label={__('Border Radius (px)')}
        min={0}
        max={100}
        value={radius}
        onChange={value => {
          if (attributePrefix) {
            setAttributes({ [`${attributePrefix}BorderRadius`]: value });
          } else {
            setAttributes({ borderRadius: value });
          }
        }}
        step={1}
        initialPosition={defaultValues.radius || 0}
        allowReset
      />
    </Fragment>
  );
};

BorderControls.propTypes = propTypes;

export default BorderControls;
