import { __ } from 'wp.i18n';
import { Component, Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import {
  InspectorControls,
  withColors,
  RichText,
  AlignmentToolbar,
  PanelColorSettings,
} from 'wp.editor';
import {
  RangeControl,
  SelectControl,
  TextControl,
  PanelBody,
} from 'wp.components';
import classNames from 'classnames';

import TextControls from '../../components/controls/text-controls/TextControls';
import Countup from './Countup';
import MarginControls from '../../components/controls/margin-controls';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';

class CountupEdit extends Component {
  static propTypes = {
    attributes: PropTypes.shape({
      startNumber: PropTypes.number.isRequired,
      endNumber: PropTypes.number.isRequired,
      animationDuration: PropTypes.number.isRequired,
      separator: PropTypes.string.isRequired,
      textFontSize: PropTypes.number,
      textColor: PropTypes.string,
      customTextColor: PropTypes.string,
      prefix: PropTypes.string,
      suffix: PropTypes.string,
      blockMargin: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
      }),
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
      textFontSize,
      prefix,
      suffix,
      titleContent,
      align,
      blockMargin,
    } = attributes;

    return (
      <Fragment>
        <div
          className={classNames({
            [className]: true,
            [`${className}-align-${align}`]: !!align,
          })}
          style={{
            margin: getMarginSettingStyles(blockMargin),
          }}
        >
          <Countup {...attributes} className={`${className}-number`} />

          <RichText
            tagName="p"
            value={titleContent}
            onChange={value => setAttributes({ titleContent: value })}
            className={`${className}-title`}
            placeholder={__('Write a title…')}
          />
        </div>

        {isSelected && (
          <InspectorControls>
            <PanelBody title={__('Settings')} initialOpen>
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

              <TextControls
                setAttributes={setAttributes}
                attributeKey="text"
                attributes={{
                  textFontSize,
                }}
                defaultFontSize={textFontSize}
              />

              <p>{__('Alignment')}</p>
              <AlignmentToolbar
                value={align}
                onChange={value => setAttributes({ align: value || 'left' })}
              />
            </PanelBody>

            <PanelBody title={__('Block Appearance')} initialOpen={false}>
              <MarginControls
                attributeKey="blockMargin"
                attributes={attributes}
                setAttributes={setAttributes}
              />
            </PanelBody>

            <PanelColorSettings
              colorValue={textColor.value}
              title={__('Color Settings')}
              onChange={setTextColor}
              colorSettings={[
                {
                  value: textColor.value,
                  onChange: setTextColor,
                  label: __('Text Color'),
                },
              ]}
            />
          </InspectorControls>
        )}
      </Fragment>
    );
  }
}

export default withColors({ textColor: 'color' })(CountupEdit);
