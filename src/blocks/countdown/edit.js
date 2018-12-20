import { Component, Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  PanelBody,
  ToggleControl,
  DateTimePicker,
  RangeControl,
} from 'wp.components';
import { InspectorControls, RichText, ColorPalette } from 'wp.editor';
import moment from 'moment';

import { capitalize } from '../../util/text';
import CountdownTimer from '../../util/CountdownTimer';
import TextControls from '../../components/controls/text-controls/TextControls';
import MarginControls from '../../components/controls/margin-controls';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';

class CountdownEdit extends Component {
  static propTypes = {
    attributes: PropTypes.shape({
      date: PropTypes.string.isRequired,
      displayDays: PropTypes.bool.isRequired,
      displayHours: PropTypes.bool.isRequired,
      displayMinutes: PropTypes.bool.isRequired,
      displaySeconds: PropTypes.bool.isRequired,
      displayLabels: PropTypes.bool.isRequired,
      labelDays: PropTypes.string.isRequired,
      labelHours: PropTypes.string.isRequired,
      labelMinutes: PropTypes.string.isRequired,
      labelSeconds: PropTypes.string.isRequired,
      textColor: PropTypes.string,
      backgroundColor: PropTypes.string,
      numberFontSize: PropTypes.number.isRequired,
      labelFontSize: PropTypes.number.isRequired,
      maxWidth: PropTypes.number,
      blockMargin: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
      }),
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    setAttributes: PropTypes.func.isRequired,
  };

  countdown = null;
  clock = null;
  now = moment().format();

  componentDidMount() {
    const { date = this.now } = this.props.attributes;

    this.countdown = new CountdownTimer(this.clock, date);
  }

  componentWillReceiveProps(nextProps) {
    const { date = this.now } = this.props.attributes;
    const { date: nextDate } = nextProps.attributes;

    if (date !== nextDate) {
      this.countdown.destroy();
      this.countdown = new CountdownTimer(this.clock, nextDate);
    }
  }

  renderItem = key => {
    const { className, attributes, setAttributes } = this.props;
    const {
      displayLabels,
      backgroundColor,
      numberFontSize,
      labelFontSize,
      maxWidth,
    } = attributes;
    const displayAttributeKey = `display${[capitalize(key)]}`;
    const labelAttributeKey = `label${[capitalize(key)]}`;

    return (
      <div
        className={`${className}-item`}
        style={{
          display: attributes[displayAttributeKey] ? 'block' : 'none',
          backgroundColor: backgroundColor || undefined,
          maxWidth: maxWidth ? `${maxWidth}%` : undefined,
        }}
      >
        <p
          className={`gutenbee-countdown-number gutenbee-countdown-${key}`}
          style={{
            fontSize: numberFontSize,
          }}
        />

        {displayLabels && (
          <div
            style={{
              fontSize: labelFontSize,
            }}
          >
            <RichText
              tagName="p"
              className={`gutenbee-countdown-label gutenbee-countdown-label-${key}`}
              value={attributes[labelAttributeKey]}
              onChange={value => setAttributes({ [labelAttributeKey]: value })}
            />
          </div>
        )}
      </div>
    );
  };

  render() {
    const { attributes, isSelected, className, setAttributes } = this.props;

    const {
      date,
      displayDays,
      displayHours,
      displayMinutes,
      displaySeconds,
      displayLabels,
      textColor,
      backgroundColor,
      numberFontSize,
      labelFontSize,
      maxWidth,
      blockMargin,
    } = attributes;

    const items = ['days', 'hours', 'minutes', 'seconds'];

    return (
      <Fragment>
        <div
          className={className}
          style={{
            margin: getMarginSettingStyles(blockMargin),
          }}
          ref={ref => {
            this.clock = ref;
          }}
        >
          <div
            className={`${className}-wrap`}
            style={{
              color: textColor || undefined,
            }}
          >
            {items.map(key => this.renderItem(key))}
          </div>
        </div>

        {isSelected && (
          <InspectorControls>
            <PanelBody title={__('Date & Time')}>
              <DateTimePicker
                currentDate={date || this.now}
                onChange={value => {
                  setAttributes({ date: value });
                }}
                is12Hour={false}
              />
            </PanelBody>

            <PanelBody title={__('Settings')} initialOpen={false}>
              <ToggleControl
                label={__('Show Days')}
                checked={displayDays}
                onChange={value => setAttributes({ displayDays: value })}
              />
              <ToggleControl
                label={__('Show Hours')}
                checked={displayHours}
                onChange={value => setAttributes({ displayHours: value })}
              />
              <ToggleControl
                label={__('Show Minutes')}
                checked={displayMinutes}
                onChange={value => setAttributes({ displayMinutes: value })}
              />
              <ToggleControl
                label={__('Show Seconds')}
                checked={displaySeconds}
                onChange={value => setAttributes({ displaySeconds: value })}
              />
              <ToggleControl
                label={__('Show Labels')}
                checked={displayLabels}
                onChange={value => setAttributes({ displayLabels: value })}
              />
            </PanelBody>

            <PanelBody title={__('Appearance')} initialOpen={false}>
              <TextControls
                setAttributes={setAttributes}
                attributeKey="number"
                attributes={attributes}
                defaultFontSize={numberFontSize}
                fontSizeLabel={__('Number Font Size')}
              />
              <TextControls
                setAttributes={setAttributes}
                attributeKey="label"
                attributes={attributes}
                defaultFontSize={labelFontSize}
                fontSizeLabel={__('Label Font Size')}
              />
              <RangeControl
                label={__('Box max width (%)')}
                min={0}
                max={100}
                value={maxWidth}
                onChange={value => setAttributes({ maxWidth: value })}
              />
              <MarginControls
                setAttributes={setAttributes}
                attributes={attributes}
                attributeKey="blockMargin"
              />
            </PanelBody>

            <PanelBody title={__('Text Color')} initialOpen={false}>
              <ColorPalette
                value={textColor}
                onChange={value => setAttributes({ textColor: value })}
              />
            </PanelBody>

            <PanelBody title={__('Background Color')} initialOpen={false}>
              <ColorPalette
                value={backgroundColor}
                onChange={value => setAttributes({ backgroundColor: value })}
              />
            </PanelBody>
          </InspectorControls>
        )}
      </Fragment>
    );
  }
}

export default CountdownEdit;
