import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { Fragment } from 'wp.element';
import { InnerBlocks, FontSizePicker } from 'wp.blockEditor';
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

const propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
};

const IconListEdit = ({ attributes, setAttributes, className, clientId }) => {
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
    return layout === 'inline' ? (
      <Fragment>
        <Rule
          value={itemSpacing}
          rule="li.wp-block-gutenbee-icon-list-item { margin-right: calc( %s/2 ); }"
          unit="px"
        />
        <Rule
          value={itemSpacing}
          rule="li.wp-block-gutenbee-icon-list-item { padding-right: calc( %s/2 ); }"
          unit="px"
        />
        <Rule
          value={separatorWidth}
          rule="li.wp-block-gutenbee-icon-list-item { border-right: solid %s; }"
          unit="px"
        />
        <Rule
          value={separatorColor}
          rule="li.wp-block-gutenbee-icon-list-item { border-color: %s; }"
          unit=""
        />
        <Rule
          value={0}
          rule="div > .wp-block:last-child li.wp-block-gutenbee-icon-list-item { border: %1$s; margin-right: %1$s; padding-right: %1$s; }"
          unit=""
        />
      </Fragment>
    ) : (
      <Fragment>
        <Rule
          value={itemSpacing}
          rule="li.wp-block-gutenbee-icon-list-item { margin-bottom: calc( %s/2 ); }"
          unit="px"
        />
        <Rule
          value={itemSpacing}
          rule="li.wp-block-gutenbee-icon-list-item { padding-bottom: calc( %s/2 ); }"
          unit="px"
        />
        <Rule
          value={separatorWidth}
          rule="li.wp-block-gutenbee-icon-list-item { border-bottom: solid %s; }"
          unit="px"
        />
        <Rule
          value={separatorColor}
          rule="li.wp-block-gutenbee-icon-list-item { border-color: %s; }"
          unit=""
        />
        <Rule
          value={0}
          rule="div > .wp-block:last-child li.wp-block-gutenbee-icon-list-item { border: %1$s; margin-bottom: %1$s; padding-bottom: %1$s; }"
          unit=""
        />
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div
        id={blockId}
        className="wp-block-gutenbee-list-icon-wrapper"
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <ul
          className={classNames(className, {
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
          />
          <ResponsiveControl>
            {breakpoint => (
              <RangeControl
                label={__('List Item Spacing')}
                min={0}
                max={200}
                value={itemSpacing[breakpoint]}
                onChange={value =>
                  setAttributes({
                    itemSpacing: {
                      ...itemSpacing,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
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
          />
          <RangeControl
            label={__('List Item Separator Width')}
            min={0}
            max={200}
            value={separatorWidth}
            onChange={value => {
              setAttributes({ separatorWidth: value });
            }}
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
            {breakpoint => (
              <FontSizePicker
                value={iconSize[breakpoint]}
                onChange={value =>
                  setAttributes({
                    iconSize: {
                      ...iconSize,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>
        </PanelBody>
        <PanelBody
          title={__('Text Settings')}
          initialOpen={false}
          className="blocks-font-size"
        >
          <ResponsiveControl>
            {breakpoint => (
              <FontSizePicker
                value={fontSize[breakpoint]}
                onChange={value =>
                  setAttributes({
                    fontSize: {
                      ...fontSize,
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
      </InspectorControls>
    </Fragment>
  );
};

IconListEdit.propTypes = propTypes;

export default IconListEdit;