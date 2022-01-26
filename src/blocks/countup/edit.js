import { __ } from 'wp.i18n';
import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import {
  InspectorControls,
  withColors,
  RichText,
  AlignmentToolbar,
  BlockControls,
} from 'wp.blockEditor';
import {
  RangeControl,
  SelectControl,
  TextControl,
  PanelBody,
  CheckboxControl,
} from 'wp.components';
import classNames from 'classnames';

import Countup from './Countup';
import MarginControls from '../../components/controls/margin-controls';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import CountupStyle from './style';
import FontSizePickerLabel from '../../components/controls/text-controls/FontSizePickerLabel';
import BorderControls from '../../components/controls/border-controls';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

const propTypes = {
  attributes: PropTypes.shape({
    uniqueId: PropTypes.string,
    startNumber: PropTypes.number.isRequired,
    endNumber: PropTypes.number.isRequired,
    animationDuration: PropTypes.number.isRequired,
    separator: PropTypes.string.isRequired,
    textFontSize: PropTypes.number,
    textColor: PropTypes.string,
    customTextColor: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    inViewport: PropTypes.bool,
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
  clientId: PropTypes.string.isRequired,
};

const CountupEdit = ({
  attributes,
  setAttributes,
  isSelected,
  className,
  clientId,
}) => {
  const {
    uniqueId,
    startNumber,
    endNumber,
    animationDuration,
    inViewport,
    separator,
    textFontSize,
    titleFontSize,
    prefix,
    suffix,
    titleContent,
    align,
    textColor,
    titleColor,
    backgroundColor,
    titleTopMargin,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <div
        id={blockId}
        className={classNames({
          [className]: !!className,
          [blockId]: true,
          [`wp-block-gutenbee-countup-align-${align}`]: !!align,
        })}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <CountupStyle attributes={attributes} />

        <Countup {...attributes} className="wp-block-gutenbee-countup-number" />

        <RichText
          tagName="p"
          value={titleContent}
          onChange={value => setAttributes({ titleContent: value })}
          className="wp-block-gutenbee-countup-title"
          placeholder={__('Write a title…')}
          style={{
            color: titleColor || undefined,
            marginTop:
              titleTopMargin != null ? `${titleTopMargin}px` : undefined,
          }}
        />
      </div>

      {isSelected && (
        <Fragment>
          <BlockControls>
            <AlignmentToolbar
              value={align}
              onChange={value => setAttributes({ align: value || 'left' })}
            />
          </BlockControls>

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

              <CheckboxControl
                label={__('Start counting when in viewport')}
                value="on"
                checked={inViewport}
                onChange={value => {
                  setAttributes({ inViewport: value });
                }}
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

              <ResponsiveControl>
                {breakpoint => (
                  <FontSizePickerLabel
                    label={__('Text Font Size')}
                    value={textFontSize[breakpoint]}
                    onChange={value =>
                      setAttributes({
                        textFontSize: {
                          ...textFontSize,
                          [breakpoint]: value != null ? value : '',
                        },
                      })
                    }
                  />
                )}
              </ResponsiveControl>

              <RangeControl
                label={__('Title Top Margin')}
                value={titleTopMargin}
                onChange={value => {
                  setAttributes({
                    titleTopMargin: value != null ? value : undefined,
                  });
                }}
                min={0}
                max={200}
                allowReset
              />

              <ResponsiveControl>
                {breakpoint => (
                  <FontSizePickerLabel
                    label={__('Title Font Size')}
                    value={titleFontSize[breakpoint]}
                    onChange={value =>
                      setAttributes({
                        titleFontSize: {
                          ...titleFontSize,
                          [breakpoint]: value != null ? value : '',
                        },
                      })
                    }
                  />
                )}
              </ResponsiveControl>
            </PanelBody>

            <PanelBody title={__('Block Appearance')} initialOpen={false}>
              <PopoverColorControl
                label={__('Text Color')}
                value={textColor || ''}
                defaultValue={textColor || ''}
                onChange={value => setAttributes({ textColor: value })}
              />

              <PopoverColorControl
                label={__('Title Color')}
                value={titleColor || ''}
                defaultValue={titleColor || ''}
                onChange={value => setAttributes({ titleColor: value })}
              />

              <PopoverColorControl
                label={__('Background Color')}
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
        </Fragment>
      )}
    </Fragment>
  );
};

CountupEdit.propTypes = propTypes;

export default withColors({ textColor: 'color' })(CountupEdit);
