import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { Fragment } from 'wp.element';
import { InnerBlocks, useBlockProps } from 'wp.blockEditor';
import { InspectorControls } from 'wp.blockEditor';
import { PanelBody, SelectControl, RangeControl } from 'wp.components';
import classNames from 'classnames';
import { useDispatch, useSelect } from 'wp.data';

import getBlockId from '../../util/getBlockId';
import useUniqueId from '../../hooks/useUniqueId';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import MarginControls from '../../components/controls/margin-controls';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import BorderControls from '../../components/controls/border-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import IconListStyle from './style';
import Rule from '../../components/stylesheet/Rule';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';
import FontSizePickerLabel from '../../components/controls/text-controls/FontSizePickerLabel';
import AnimationControls from '../../components/controls/animation-controls/AnimationControls';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  className: PropTypes.string,
  clientId: PropTypes.string.isRequired,
};

const IconListEdit = ({
  attributes,
  setAttributes,
  className = '',
  clientId,
}) => {
  const {
    uniqueId,
    color,
    iconColor,
    backgroundColor,
    fontSize,
    iconSize,
    layout,
    itemSpacing,
    align,
    blockLink,
    separatorWidth,
    separatorColor,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;
  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  const LAYOUT = {
    DEFAULT: 'default',
    INLINE: 'inline',
  };

  const BLOCKLINK = {
    INLINE: 'inline',
    BLOCK: 'block',
  };

  const ALIGN = {
    FLEXSTART: 'flex-start',
    CENTER: 'center',
    FLEXEND: 'flex-end',
  };

  const { innerBlocks } = useSelect(select => {
    const [parent] = select('core/block-editor').getBlocksByClientId(clientId);
    const { innerBlocks } = parent;
    return {
      innerBlocks,
    };
  });

  const { updateBlockAttributes } = useDispatch('core/block-editor');

  const renderLayoutEditorSpecificRules = () => {
    // Check if itemSpacing has any valid values
    const hasItemSpacing =
      itemSpacing &&
      (itemSpacing.desktop != null ||
        itemSpacing.tablet != null ||
        itemSpacing.mobile != null);

    return layout === 'inline' ? (
      <Fragment>
        {hasItemSpacing && (
          <>
            <Rule
              value={itemSpacing}
              rule=".wp-block-gutenbee-icon-list.[root] li.wp-block-gutenbee-icon-list-item { margin-right: calc( %s/2 ); }"
              unit="px"
            />
            <Rule
              value={itemSpacing}
              rule=".wp-block-gutenbee-icon-list.[root] li.wp-block-gutenbee-icon-list-item { padding-right: calc( %s/2 ); }"
              unit="px"
            />
          </>
        )}
        {separatorWidth != null && separatorWidth !== undefined && (
          <Rule
            value={separatorWidth}
            rule=".wp-block-gutenbee-icon-list.[root] li.wp-block-gutenbee-icon-list-item { border-right: solid %s; }"
            unit="px"
          />
        )}
        {separatorColor && separatorColor !== undefined && (
          <Rule
            value={separatorColor}
            rule=".wp-block-gutenbee-icon-list.[root] li.wp-block-gutenbee-icon-list-item { border-color: %s; }"
            unit=""
          />
        )}
        <Rule
          value={0}
          rule=".wp-block-gutenbee-icon-list.[root] div > .wp-block:last-child li.wp-block-gutenbee-icon-list-item { border: %1$s; margin-right: %1$s; padding-right: %1$s; }"
          unit=""
        />
      </Fragment>
    ) : (
      <Fragment>
        {hasItemSpacing && (
          <>
            <Rule
              value={itemSpacing}
              rule=".wp-block-gutenbee-icon-list.[root] li.wp-block-gutenbee-icon-list-item { margin-bottom: calc( %s/2 ); }"
              unit="px"
            />
            <Rule
              value={itemSpacing}
              rule=".wp-block-gutenbee-icon-list.[root] li.wp-block-gutenbee-icon-list-item { padding-bottom: calc( %s/2 ); }"
              unit="px"
            />
          </>
        )}
        {separatorWidth != null && separatorWidth !== undefined && (
          <Rule
            value={separatorWidth}
            rule=".wp-block-gutenbee-icon-list.[root] li.wp-block-gutenbee-icon-list-item { border-bottom: solid %s; }"
            unit="px"
          />
        )}
        {separatorColor && separatorColor !== undefined && (
          <Rule
            value={separatorColor}
            rule=".wp-block-gutenbee-icon-list.[root] li.wp-block-gutenbee-icon-list-item { border-color: %s; }"
            unit=""
          />
        )}
        <Rule
          value={0}
          rule=".wp-block-gutenbee-icon-list.[root] div > .wp-block:last-child li.wp-block-gutenbee-icon-list-item { border: %1$s; margin-bottom: %1$s; padding-bottom: %1$s; }"
          unit=""
        />
      </Fragment>
    );
  };

  const blockProps = useBlockProps({
    id: blockId,
    className: classNames(className, blockId),
    style: {
      backgroundColor: backgroundColor ? backgroundColor : undefined,
      ...getBorderCSSValue({ attributes }),
      ...getBoxShadowCSSValue({ attributes }),
    },
  });

  return (
    <Fragment>
      <div {...blockProps}>
        <ul
          className={classNames({
            'wp-block-gutenbee-icon-list-element': true,
            'wp-block-gutenbee-list-inline': layout === 'inline',
            'wp-block-gutenbee-list-block-link': blockLink === 'block',
          })}
        >
          <InnerBlocks
            allowedBlocks={['gutenbee/icon-list-item']}
            template={[['gutenbee/icon-list-item']]}
          />
        </ul>
      </div>

      <IconListStyle attributes={attributes}>
        {renderLayoutEditorSpecificRules()}
      </IconListStyle>
      <InspectorControls>
        <PanelBody title={__('List Settings')} className="blocks-list-settings">
          <SelectControl
            label={__('List Layout')}
            value={layout}
            onChange={value => setAttributes({ layout: value })}
            options={[
              { value: LAYOUT.DEFAULT, label: __('Default') },
              { value: LAYOUT.INLINE, label: __('Inline') },
            ]}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
          />
          <ResponsiveControl>
            {breakpoint => (
              <RangeControl
                label={__('List Item Spacing')}
                min={0}
                max={200}
                value={itemSpacing[breakpoint]}
                allowReset
                onChange={value =>
                  setAttributes({
                    itemSpacing: {
                      ...itemSpacing,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
                __nextHasNoMarginBottom
                __next40pxDefaultSize
              />
            )}
          </ResponsiveControl>
          <p>{__('Alignment')}</p>
          <ResponsiveControl>
            {breakpoint => (
              <SelectControl
                label={__('List Alignment')}
                value={align[breakpoint]}
                onChange={value =>
                  setAttributes({
                    align: {
                      ...align,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
                options={[
                  { value: ALIGN.FLEXSTART, label: __('Left') },
                  { value: ALIGN.CENTER, label: __('Center') },
                  { value: ALIGN.FLEXEND, label: __('Right') },
                ]}
                __nextHasNoMarginBottom
                __next40pxDefaultSize
              />
            )}
          </ResponsiveControl>
          <SelectControl
            label={__('List Item Link Display')}
            value={blockLink}
            onChange={value => setAttributes({ blockLink: value })}
            options={[
              { value: BLOCKLINK.INLINE, label: __('Inline') },
              { value: BLOCKLINK.BLOCK, label: __('Block') },
            ]}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
          />
          <RangeControl
            label={__('List Item Separator Width')}
            min={0}
            max={200}
            value={separatorWidth}
            onChange={value => {
              setAttributes({ separatorWidth: value });
            }}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
          />
          <PopoverColorControl
            value={separatorColor}
            defaultValue={separatorColor || ''}
            label={__('List Item Separator Color')}
            onChange={value => {
              setAttributes({ separatorColor: value });
            }}
          />
        </PanelBody>
        <PanelBody
          title={__('Icon Settings')}
          className="blocks-icon-size"
          initialOpen={false}
        >
          <ResponsiveControl>
            {breakpoint => {
              const currentIconSize = iconSize[breakpoint];
              let fontSizeValue;
              if (
                currentIconSize !== undefined &&
                currentIconSize !== '' &&
                currentIconSize != null
              ) {
                if (typeof currentIconSize === 'number') {
                  fontSizeValue = currentIconSize;
                } else if (typeof currentIconSize === 'string') {
                  const numericValue = currentIconSize.replace('px', '');
                  fontSizeValue = numericValue
                    ? Number(numericValue)
                    : undefined;
                } else {
                  fontSizeValue = Number(currentIconSize);
                }
              } else {
                fontSizeValue = undefined;
              }
              return (
                <FontSizePickerLabel
                  label={__('Icon Size')}
                  value={fontSizeValue}
                  onChange={value =>
                    setAttributes({
                      iconSize: {
                        ...iconSize,
                        [breakpoint]: value != null ? Number(value) : '',
                      },
                    })
                  }
                />
              );
            }}
          </ResponsiveControl>
        </PanelBody>
        <PanelBody
          title={__('Text Settings')}
          initialOpen={false}
          className="blocks-font-size"
        >
          <ResponsiveControl>
            {breakpoint => {
              const currentFontSize = fontSize[breakpoint];
              let fontSizeValue;
              if (
                currentFontSize !== undefined &&
                currentFontSize !== '' &&
                currentFontSize != null
              ) {
                if (typeof currentFontSize === 'number') {
                  fontSizeValue = currentFontSize;
                } else if (typeof currentFontSize === 'string') {
                  const numericValue = currentFontSize.replace('px', '');
                  fontSizeValue = numericValue
                    ? Number(numericValue)
                    : undefined;
                } else {
                  fontSizeValue = Number(currentFontSize);
                }
              } else {
                fontSizeValue = undefined;
              }
              return (
                <FontSizePickerLabel
                  label={__('Text Font Size')}
                  value={fontSizeValue}
                  onChange={value =>
                    setAttributes({
                      fontSize: {
                        ...fontSize,
                        [breakpoint]: value != null ? Number(value) : '',
                      },
                    })
                  }
                />
              );
            }}
          </ResponsiveControl>
        </PanelBody>
        <PanelBody title={__('Block Appearance')} initialOpen={false}>
          <PopoverColorControl
            value={color}
            defaultValue={color || ''}
            label={__('Text Color')}
            onChange={value => {
              setAttributes({ color: value });
              innerBlocks.forEach(innerBlock => {
                updateBlockAttributes(innerBlock.clientId, {
                  color: value,
                });
              });
            }}
          />

          <PopoverColorControl
            value={iconColor}
            defaultValue={iconColor || ''}
            label={__('Icon Color')}
            onChange={value => {
              setAttributes({ iconColor: value });
              innerBlocks.forEach(innerBlock => {
                updateBlockAttributes(innerBlock.clientId, {
                  iconColor: value,
                });
              });
            }}
          />

          <PopoverColorControl
            value={backgroundColor}
            defaultValue={backgroundColor || ''}
            label={__('Background Color')}
            onChange={value => {
              setAttributes({ backgroundColor: value });
            }}
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

        {__GUTENBEE_SETTINGS__.plugin.settings['active_animation-controls'] && (
          <PanelBody
            icon={!!attributes.animation?.type && 'saved'}
            title={__('Animation')}
            initialOpen={false}
          >
            <AnimationControls
              attributes={(() => {
                const {
                  duration: durationStr,
                  delay: delayStr,
                  ...restAnimation
                } = attributes.animation || {};
                return {
                  ...restAnimation,
                  duration:
                    durationStr !== undefined && durationStr !== ''
                      ? Number(durationStr)
                      : undefined,
                  delay:
                    delayStr !== undefined && delayStr !== ''
                      ? Number(delayStr)
                      : undefined,
                };
              })()}
              setAttributes={setAttributes}
            />
          </PanelBody>
        )}
      </InspectorControls>
    </Fragment>
  );
};

IconListEdit.propTypes = propTypes;

export default IconListEdit;
