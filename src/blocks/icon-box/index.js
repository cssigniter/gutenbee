/**
 * Icon Box Block
 */

import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText, InspectorControls } from 'wp.blockEditor';
import { PanelBody, SelectControl, RangeControl } from 'wp.components';
import classNames from 'classnames';
import omit from 'lodash.omit';

import { iconAttributes, IconSettings } from '../icon';
import Icon from '../icon/Icon';
import IconBoxBlockIcon from './block-icon';
import MarginControls from '../../components/controls/margin-controls';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import deprecated from './deprecated';
import IconBoxStyle from './style';
import { capitalize } from '../../util/text';
import FontSizePickerLabel from '../../components/controls/text-controls/FontSizePickerLabel';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import BorderControls from '../../components/controls/border-controls';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import HeadingToolbar from '../heading/heading-toolbar';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

const IconBox = ({ className, attributes }) => {
  const {
    uniqueId,
    titleNodeLevel,
    titleContent,
    textContent,
    align,
    contentAlign,
    iconMargin,
    iconPadding,
    titleBottomSpacing,
    titleColor,
    textColor,
    backgroundColor,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <div
      id={blockId}
      className={classNames(
        className,
        blockId,
        getBreakpointVisibilityClassNames(blockBreakpointVisibility),
        getAuthVisibilityClasses(blockAuthVisibility),
        {
          [`wp-block-gutenbee-iconbox-align-${align}`]: true,
          [`wp-block-gutenbee-iconbox-content-align-${contentAlign}`]: !!contentAlign,
        },
      )}
      style={{
        backgroundColor: backgroundColor || undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      }}
    >
      <IconBoxStyle attributes={attributes} />
      <Icon
        id={`${blockId}-icon`}
        {...{
          ...attributes,
          blockMargin: iconMargin,
          blockPadding: iconPadding,
        }}
      />
      <div className="wp-block-gutenbee-iconbox-content">
        {!RichText.isEmpty(titleContent) && (
          <RichText.Content
            tagName={`h${titleNodeLevel}`}
            value={titleContent}
            className="wp-block-gutenbee-iconbox-title"
            style={{
              color: titleColor || undefined,
              marginBottom:
                titleBottomSpacing != null
                  ? `${titleBottomSpacing}px`
                  : undefined,
            }}
          />
        )}

        {!RichText.isEmpty(textContent) && (
          <RichText.Content
            tagName="p"
            value={textContent}
            className="wp-block-gutenbee-iconbox-text"
            style={{
              color: textColor || undefined,
            }}
          />
        )}
      </div>
    </div>
  );
};

const IconBoxEditBlock = ({
  className,
  attributes,
  setAttributes,
  isSelected,
  clientId,
}) => {
  const {
    uniqueId,
    titleContent,
    titleNodeLevel,
    titleFontSize,
    textContent,
    textFontSize,
    align,
    contentAlign,
    iconMargin,
    iconPadding,
    titleBottomSpacing,
    titleColor,
    textColor,
    backgroundColor,
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
          [`wp-block-gutenbee-iconbox-align-${align}`]: true,
          [`wp-block-gutenbee-iconbox-content-align-${contentAlign}`]: !!contentAlign,
        })}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <IconBoxStyle attributes={attributes} />

        <Icon
          id={`${blockId}-icon`}
          {...{
            ...attributes,
            blockMargin: iconMargin,
            blockPadding: iconPadding,
          }}
        />
        <div className="wp-block-gutenbee-iconbox-content">
          <RichText
            tagName={`h${titleNodeLevel}`}
            value={titleContent}
            onChange={value => setAttributes({ titleContent: value })}
            className="wp-block-gutenbee-iconbox-title"
            placeholder={__('Write heading…')}
            style={{
              color: titleColor || undefined,
              marginBottom:
                titleBottomSpacing != null
                  ? `${titleBottomSpacing}px`
                  : undefined,
            }}
          />

          <RichText
            tagName="p"
            value={textContent}
            onChange={value => setAttributes({ textContent: value })}
            className="wp-block-gutenbee-iconbox-text"
            placeholder={__('Write content…')}
            style={{
              color: textColor || undefined,
            }}
          />
        </div>
      </div>

      {isSelected && (
        <InspectorControls>
          <IconSettings
            className={className}
            setAttributes={setAttributes}
            alignmentOptions={[
              {
                value: 'left',
                label: __('Left'),
              },
              {
                value: 'center',
                label: __('Top'),
              },
              {
                value: 'right',
                label: __('Right'),
              },
            ]}
            attributes={{
              ...omit(attributes, [
                'blockMargin',
                'blockPadding',
                'blockBreakpointVisibility',
                'blockAuthVisibility',
              ]),
            }}
          >
            <ResponsiveControl>
              {breakpoint => (
                <MarginControls
                  label={__('Padding (px)')}
                  attributeKey="iconPadding"
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
                  attributeKey="iconMargin"
                  attributes={attributes}
                  setAttributes={setAttributes}
                  breakpoint={breakpoint}
                />
              )}
            </ResponsiveControl>
          </IconSettings>

          <PanelBody title={__('Content Settings')} initialOpen={false}>
            <SelectControl
              label={__('Content Text Alignment')}
              value={contentAlign}
              options={['', 'left', 'center', 'right'].map(option => ({
                value: option,
                label: option ? capitalize(option) : 'None',
              }))}
              onChange={value => {
                setAttributes({ contentAlign: value || undefined });
              }}
            />

            <p>{__('Heading element')}</p>
            <HeadingToolbar
              isCollapsed={false}
              minLevel={1}
              maxLevel={7}
              selectedLevel={titleNodeLevel}
              onChange={newLevel => setAttributes({ titleNodeLevel: newLevel })}
            />

            <ResponsiveControl>
              {breakpoint => {
                return (
                  <FontSizePickerLabel
                    value={titleFontSize[breakpoint]}
                    label={__('Heading Font Size')}
                    onChange={value =>
                      setAttributes({
                        titleFontSize: {
                          ...titleFontSize,
                          [breakpoint]: value || '',
                        },
                      })
                    }
                  />
                );
              }}
            </ResponsiveControl>

            <RangeControl
              label={__('Heading Bottom Margin')}
              value={titleBottomSpacing}
              onChange={value => {
                setAttributes({
                  titleBottomSpacing: value != null ? value : undefined,
                });
              }}
              allowReset
              min={0}
              max={200}
            />

            <ResponsiveControl>
              {breakpoint => {
                return (
                  <FontSizePickerLabel
                    value={textFontSize[breakpoint]}
                    label={__('Text Font Size')}
                    onChange={value => {
                      setAttributes({
                        textFontSize: {
                          ...textFontSize,
                          [breakpoint]: value || '',
                        },
                      });
                    }}
                  />
                );
              }}
            </ResponsiveControl>
          </PanelBody>

          <PanelBody title={__('Block Appearance')} initialOpen={false}>
            <PopoverColorControl
              label={__('Title Color')}
              value={titleColor || ''}
              defaultValue={titleColor || ''}
              onChange={value => setAttributes({ titleColor: value })}
            />

            <PopoverColorControl
              label={__('Content Text Color')}
              value={textColor || ''}
              defaultValue={textColor || ''}
              onChange={value => setAttributes({ textColor: value })}
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

registerBlockType('gutenbee/iconbox', {
  title: __('GutenBee Icon Box'),
  description: __('A flexible icon box block'),
  icon: IconBoxBlockIcon,
  category: 'gutenbee',
  keywords: [__('icon')],
  supports: {
    anchor: false,
  },
  attributes: {
    ...iconAttributes,
    uniqueId: {
      type: 'string',
    },
    titleBottomSpacing: {
      type: 'number',
    },
    titleContent: {
      source: 'html',
      selector: 'h1,h2,h3,h4,h5,h6',
      default: '',
    },
    titleNodeLevel: {
      type: 'number',
      default: 3,
    },
    titleFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    textContent: {
      source: 'html',
      selector: 'p',
      default: '',
    },
    textFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    align: {
      type: 'string',
      default: 'left',
    },
    contentAlign: {
      type: 'string',
      default: null,
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    iconMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    iconPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    textColor: {
      type: 'string',
    },
    titleColor: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
    blockBreakpointVisibility: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: false,
        tablet: false,
        mobile: false,
      }),
    },
    blockAuthVisibility: {
      type: 'object',
      default: {
        loggedIn: false,
        loggedOut: false,
      },
    },
  },
  deprecated,
  edit: IconBoxEditBlock,
  save({ className, attributes }) {
    return <IconBox className={className} attributes={attributes} />;
  },
});
