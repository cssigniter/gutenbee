import { Fragment, useEffect, useRef } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  PanelBody,
  ToggleControl,
  DateTimePicker,
  RangeControl,
} from 'wp.components';
import { InspectorControls, RichText } from 'wp.blockEditor';
import moment from 'moment';
import classNames from 'classnames';

import { capitalize } from '../../util/text';
import CountdownTimer from '../../util/CountdownTimer';
import MarginControls from '../../components/controls/margin-controls';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import FontSizePickerLabel from '../../components/controls/text-controls/FontSizePickerLabel';
import CountdownStyle from './style';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import BorderControls from '../../components/controls/border-controls';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

const propTypes = {
  attributes: PropTypes.shape({
    uniqueId: PropTypes.string,
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
    numberBackgroundColor: PropTypes.string,
    numberFontSize: PropTypes.object.isRequired,
    labelFontSize: PropTypes.object.isRequired,
    maxWidth: PropTypes.number,
    blockMargin: PropTypes.shape({
      top: PropTypes.object,
      right: PropTypes.object,
      bottom: PropTypes.object,
      left: PropTypes.object,
    }),
    blockPadding: PropTypes.shape({
      top: PropTypes.object,
      right: PropTypes.object,
      bottom: PropTypes.object,
      left: PropTypes.object,
    }),
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  setAttributes: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
};

const CountdownEdit = ({
  attributes,
  isSelected,
  className,
  setAttributes,
  clientId,
}) => {
  let countdown = useRef(null);
  const clock = useRef(null);
  const now = moment().format();

  const {
    uniqueId,
    date = now,
    displayDays,
    displayHours,
    displayMinutes,
    displaySeconds,
    displayLabels,
    textColor,
    labelTextColor,
    backgroundColor,
    numberBackgroundColor,
    numberFontSize,
    labelFontSize,
    labelTopMargin,
    maxWidth,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  useEffect(
    () => {
      if (countdown.current) {
        countdown.current.destroy();
      }

      countdown.current = new CountdownTimer(clock.current, date);
    },
    [date],
  );

  const renderItem = key => {
    const displayAttributeKey = `display${[capitalize(key)]}`;
    const labelAttributeKey = `label${[capitalize(key)]}`;

    return (
      <div
        className="wp-block-gutenbee-countdown-item"
        style={{
          display: attributes[displayAttributeKey] ? 'block' : 'none',
          backgroundColor: numberBackgroundColor || undefined,
          maxWidth: maxWidth ? `${maxWidth}%` : undefined,
        }}
      >
        <p className={`gutenbee-countdown-number gutenbee-countdown-${key}`} />

        {displayLabels && (
          <div
            style={{
              marginTop:
                labelTopMargin != null ? `${labelTopMargin}px` : undefined,
            }}
          >
            <RichText
              tagName="p"
              className={`gutenbee-countdown-label gutenbee-countdown-label-${key}`}
              value={attributes[labelAttributeKey]}
              onChange={value => setAttributes({ [labelAttributeKey]: value })}
              style={{
                color: labelTextColor || undefined,
              }}
            />
          </div>
        )}
      </div>
    );
  };

  const items = ['days', 'hours', 'minutes', 'seconds'];
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <div
        id={blockId}
        className={classNames(className, blockId)}
        ref={clock}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <CountdownStyle attributes={attributes} />
        <div
          className="wp-block-gutenbee-countdown-wrap"
          style={{
            color: textColor || undefined,
          }}
        >
          {items.map(key => renderItem(key))}
        </div>
      </div>

      {isSelected && (
        <InspectorControls>
          <PanelBody title={__('Date & Time')}>
            <DateTimePicker
              currentDate={date}
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

          <PanelBody title={__('Block Appearance')} initialOpen={false}>
            <PopoverColorControl
              label={__('Box Text Color')}
              value={textColor || ''}
              defaultValue={textColor || ''}
              onChange={value => setAttributes({ textColor: value })}
            />

            <PopoverColorControl
              label={__('Box Background Color')}
              value={numberBackgroundColor || ''}
              defaultValue={numberBackgroundColor || ''}
              onChange={value =>
                setAttributes({ numberBackgroundColor: value })
              }
            />

            <PopoverColorControl
              label={__('Box Label Text Color')}
              value={labelTextColor || ''}
              defaultValue={labelTextColor || ''}
              onChange={value => setAttributes({ labelTextColor: value })}
            />

            <PopoverColorControl
              label={__('Block Background Color')}
              value={backgroundColor || ''}
              defaultValue={backgroundColor || ''}
              onChange={value => setAttributes({ backgroundColor: value })}
            />

            <BorderControls
              attributes={attributes}
              setAttributes={setAttributes}
            />

            <BoxShadowControls
              attributes={attributes}
              setAttributes={setAttributes}
            />

            <RangeControl
              label={__('Box max width (%)')}
              min={0}
              max={100}
              value={maxWidth}
              onChange={value => setAttributes({ maxWidth: value })}
              allowReset
            />

            <ResponsiveControl>
              {breakpoint => (
                <FontSizePickerLabel
                  label={__('Number Font Size')}
                  value={numberFontSize[breakpoint]}
                  onChange={value =>
                    setAttributes({
                      numberFontSize: {
                        ...numberFontSize,
                        [breakpoint]: value != null ? value : '',
                      },
                    })
                  }
                />
              )}
            </ResponsiveControl>

            <ResponsiveControl>
              {breakpoint => (
                <FontSizePickerLabel
                  label={__('Label Font Size')}
                  value={labelFontSize[breakpoint]}
                  onChange={value =>
                    setAttributes({
                      labelFontSize: {
                        ...labelFontSize,
                        [breakpoint]: value != null ? value : '',
                      },
                    })
                  }
                />
              )}
            </ResponsiveControl>

            <RangeControl
              label={__('Label Top Margin')}
              value={labelTopMargin}
              allowReset
              onChange={value => {
                setAttributes({
                  labelTopMargin: value != null ? value : undefined,
                });
              }}
              min={0}
              max={200}
            />

            <ResponsiveControl>
              {breakpoint => (
                <MarginControls
                  label={__('Padding (px)')}
                  attributeKey="blockPadding"
                  attributes={attributes}
                  setAttributes={setAttributes}
                  breakpoint={breakpoint}
                />
              )}
            </ResponsiveControl>

            <ResponsiveControl>
              {breakpoint => (
                <MarginControls
                  label={__('Margin (px)')}
                  attributeKey="blockMargin"
                  attributes={attributes}
                  setAttributes={setAttributes}
                  breakpoint={breakpoint}
                />
              )}
            </ResponsiveControl>
          </PanelBody>

          <PanelBody title={__('Visibility Settings')} initialOpen={false}>
            <BreakpointVisibilityControl
              values={blockBreakpointVisibility}
              onChange={values => {
                setAttributes({
                  blockBreakpointVisibility: values,
                });
              }}
            />

            <AuthVisibilityControl
              values={blockAuthVisibility}
              onChange={values => {
                setAttributes({
                  blockAuthVisibility: values,
                });
              }}
            />
          </PanelBody>
        </InspectorControls>
      )}
    </Fragment>
  );
};

CountdownEdit.propTypes = propTypes;

export default CountdownEdit;
