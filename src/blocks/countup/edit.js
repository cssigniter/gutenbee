import { __ } from 'wp.i18n';
import { Component, Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import {
  InspectorControls,
  withColors,
  PanelColor,
} from 'wp.editor';
import {
  RangeControl,
  SelectControl,
  TextControl,
  PanelBody,
} from 'wp.components';
import TextControls from '../../components/controls/TextControls';
import Countup from './Countup';

class CountupEdit extends Component {
  static propTypes = {
    attributes: PropTypes.shape({
      startNumber: PropTypes.number.isRequired,
      endNumber: PropTypes.number.isRequired,
      animationDuration: PropTypes.number.isRequired,
      separator: PropTypes.string.isRequired,
      decimal: PropTypes.string.isRequired,
      textFontSize: PropTypes.number,
      textColor: PropTypes.string,
      customTextColor: PropTypes.string,
      prefix: PropTypes.string,
      suffix: PropTypes.string,
    }).isRequired,
    setAttributes: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
  };

  render() {
    const {
      attributes,
      setAttributes,
      isSelected,
      className,
      setTextColor,
      textColor,
    } = this.props;

    const {
      startNumber,
      endNumber,
      animationDuration,
      separator,
      decimal,
      textFontSize,
      prefix,
      suffix,
    } = attributes;

    return (
      <Fragment>
        <Countup
          {...attributes}
          className={className}
        />

        {isSelected && (
          <InspectorControls>
            <PanelBody>
              <TextControl
                type="number"
                label={__('Start Number')}
                value={startNumber}
                onChange={value => setAttributes({ startNumber: value })}
              />

              <TextControl
                type="number"
                label={__('End Number')}
                value={endNumber}
                onChange={value => setAttributes({ endNumber: value })}
              />

              <TextControl
                label={__('Prefix')}
                value={prefix}
                onChange={value => setAttributes({ prefix: value })}
              />

              <TextControl
                label={__('Suffix')}
                value={suffix}
                onChange={value => setAttributes({ suffix: value })}
              />

              <RangeControl
                label={__('Animation Duration (seconds)')}
                value={animationDuration}
                min={0}
                max={100}
                step={0.5}
                onChange={value => setAttributes({ animationDuration: value })}
              />

              <SelectControl
                label={__('Separator')}
                value={separator}
                onChange={value => setAttributes({ separator: value })}
                options={[
                  { value: '', label: __('None') },
                  { value: ',', label: __('Comma ,') },
                  { value: '.', label: __('Dot .') },
                  { value: ' ', label: __('Space') },
                ]}
              />

              <SelectControl
                label={__('Decimal')}
                value={decimal}
                onChange={value => setAttributes({ decimal: value })}
                options={[
                  { value: '.', label: __('Dot .') },
                  { value: ',', label: __('Comma ,') },
                ]}
              />

              <TextControls
                setAttributes={setAttributes}
                attributeKey="text"
                attributes={{
                  textFontSize,
                }}
                defaultFontSize={textFontSize}
              />
            </PanelBody>

            <PanelColor
              colorValue={textColor.value}
              title={__('Text Color')}
              onChange={setTextColor}
            />
          </InspectorControls>
        )}
      </Fragment>
    );
  }
}

export default withColors((getColor, setColor, { attributes }) => ({
  textColor: getColor(attributes.textColor, attributes.customTextColor, 'color'),
  setTextColor: setColor('textColor', 'customTextColor'),
}))(CountupEdit);
