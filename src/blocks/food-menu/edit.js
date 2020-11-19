import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { Fragment } from 'wp.element';
import { InnerBlocks, __experimentalBlock as Block } from 'wp.blockEditor';
import { InspectorControls } from 'wp.blockEditor';
import { PanelBody, RangeControl } from 'wp.components';
import classnames from 'classnames';

import getBlockId from '../../util/getBlockId';
import useUniqueId from '../../hooks/useUniqueId';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import MarginControls from '../../components/controls/margin-controls';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import BorderControls from '../../components/controls/border-controls';
import FoodMenuStyle from './style';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import Rule from '../../components/stylesheet/Rule';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
};

const FoodMenuEdit = ({ attributes, setAttributes, className, clientId }) => {
  const { uniqueId, backgroundColor, columns, gutter } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <div
        className={classnames(className, blockId, {
          [`gutenbee-food-menu-columns-desktop-${columns.desktop}`]: true,
          [`gutenbee-food-menu-columns-tablet-${columns.tablet}`]: true,
          [`gutenbee-food-menu-columns-mobile-${columns.mobile}`]: true,
        })}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <InnerBlocks
          allowedBlocks={['gutenbee/food-menu-item']}
          template={[['gutenbee/food-menu-item']]}
          __experimentalUIParts={{ hasSelectedUI: false }}
          __experimentalMoverDirection="vertical"
          __experimentalTagName={Block.div}
        />

        <FoodMenuStyle attributes={attributes}>
          <Rule
            value={gutter}
            rule="[data-type='gutenbee/food-menu'] { grid-gap: %s; }"
            unit="px"
          />
        </FoodMenuStyle>
      </div>

      <InspectorControls>
        <PanelBody label={__('Menu Settings')} initialOpen>
          <ResponsiveControl>
            {breakpoint => (
              <RangeControl
                label={__('Columns')}
                min={1}
                max={3}
                value={columns[breakpoint]}
                onChange={value =>
                  setAttributes({
                    columns: {
                      ...columns,
                      [breakpoint]: value,
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>

          <ResponsiveControl>
            {breakpoint => (
              <RangeControl
                label={__('Gutter (px)')}
                help={__(
                  'Controls the vertical and horizontal space between menu items.',
                )}
                min={0}
                max={100}
                value={gutter[breakpoint]}
                initialPosition={30}
                onChange={value =>
                  setAttributes({
                    gutter: {
                      ...gutter,
                      [breakpoint]: value,
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>
        </PanelBody>

        <PanelBody title={__('Block Appearance')} initialOpen={false}>
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

FoodMenuEdit.propTypes = propTypes;

export default FoodMenuEdit;
