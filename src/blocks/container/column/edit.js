import { Fragment } from 'wp.element';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { InspectorControls, InnerBlocks } from 'wp.blockEditor';
import { PanelBody, RangeControl, SelectControl } from 'wp.components';
import { compose } from 'wp.compose';
import { withSelect, withDispatch } from 'wp.data';
import { forEach, find, difference } from 'lodash';

import useUniqueId from '../../../hooks/useUniqueId';
import ResponsiveControl from '../../../components/controls/responsive-control/ResponsiveControl';
import MarginControls from '../../../components/controls/margin-controls';
import ColumnStyle from './style';
import BackgroundControls from '../../../components/controls/background-controls/BackgroundControls';
import getBlockId from '../../../util/getBlockId';
import {
  getAdjacentBlocks,
  getColumnWidths,
  getRedistributedColumnWidths,
  getTotalColumnsWidth,
  toWidthPrecision,
} from '../utils';
import { BREAKPOINT_NAMES } from '../../../components/stylesheet/helpers';
import BorderControls from '../../../components/controls/border-controls';
import BoxShadowControls from '../../../components/controls/box-shadow-controls';
import { getBoxShadowCSSValue } from '../../../components/controls/box-shadow-controls/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import PopoverColorControl from '../../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../../components/controls/auth-visibility-control';

const propTypes = {
  className: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  hasInnerBlocks: PropTypes.bool.isRequired,
  updateWidth: PropTypes.func.isRequired,
};

const ColumnBlockEdit = ({
  className,
  attributes,
  setAttributes,
  hasInnerBlocks,
  clientId,
  updateWidth,
}) => {
  useUniqueId({ attributes, setAttributes, clientId });
  const {
    uniqueId,
    width,
    textColor,
    backgroundColor,
    backgroundImage,
    verticalContentAlignment,
    horizontalContentAlignment,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  const customClass = 'wp-block-gutenbee-column';
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <ColumnStyle attributes={attributes} />

      <div id={blockId} className={classNames(className, blockId)}>
        <div
          className={`${customClass}-content`}
          style={{
            color: textColor,
            backgroundColor,
            ...getBorderCSSValue({ attributes }),
            ...getBoxShadowCSSValue({ attributes }),
          }}
        >
          <InnerBlocks
            templateLock={false}
            renderAppender={
              hasInnerBlocks
                ? undefined
                : () => <InnerBlocks.ButtonBlockAppender />
            }
          />
        </div>
      </div>
      <InspectorControls>
        <PanelBody>
          <ResponsiveControl>
            {breakpoint => (
              <RangeControl
                label={__('Width (%)')}
                value={width[breakpoint] || ''}
                onChange={value => updateWidth(value, breakpoint)}
                min={0}
                max={100}
                step={0.01}
                required
                allowReset
              />
            )}
          </ResponsiveControl>

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

          <ResponsiveControl>
            {breakpoint => (
              <SelectControl
                label={__('Vertical Content Alignment')}
                value={verticalContentAlignment[breakpoint]}
                options={[
                  { value: '', label: __('') },
                  { value: 'flex-start', label: __('Top') },
                  { value: 'center', label: __('Middle') },
                  { value: 'flex-end', label: __('Bottom') },
                ]}
                onChange={value =>
                  setAttributes({
                    verticalContentAlignment: {
                      ...verticalContentAlignment,
                      [breakpoint]: value,
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>

          <ResponsiveControl>
            {breakpoint => (
              <SelectControl
                label={__('Horizontal Content Alignment')}
                value={horizontalContentAlignment[breakpoint]}
                options={[
                  { value: '', label: '' },
                  { value: 'flex-start', label: __('Left') },
                  { value: 'center', label: __('Center') },
                  { value: 'flex-end', label: __('Right') },
                ]}
                onChange={value =>
                  setAttributes({
                    horizontalContentAlignment: {
                      ...horizontalContentAlignment,
                      [breakpoint]: value,
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>
        </PanelBody>

        <PanelBody title={__('Color Settings')} initialOpen={false}>
          <PopoverColorControl
            label={__('Text Color')}
            value={textColor || ''}
            defaultValue={textColor || ''}
            onChange={value => setAttributes({ textColor: value })}
          />

          <PopoverColorControl
            label={__('Background Color')}
            value={backgroundColor || ''}
            defaultValue={backgroundColor || ''}
            onChange={value => setAttributes({ backgroundColor: value })}
          />

          <ResponsiveControl>
            {breakpoint => {
              return (
                <BackgroundControls
                  label={__('Background Image')}
                  backgroundImageValue={backgroundImage[breakpoint]}
                  onBackgroundImageChange={value =>
                    setAttributes({
                      backgroundImage: {
                        ...backgroundImage,
                        [breakpoint]: value,
                      },
                    })
                  }
                />
              );
            }}
          </ResponsiveControl>

          <BorderControls
            attributes={attributes}
            setAttributes={setAttributes}
          />

          <BoxShadowControls
            attributes={attributes}
            setAttributes={setAttributes}
          />
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
  );
};

ColumnBlockEdit.propTypes = propTypes;

const withInnerBlocksCheck = withSelect((select, { clientId }) => {
  const { getBlock } = select('core/block-editor');
  const block = getBlock(clientId);

  return {
    hasInnerBlocks: !!(block && block.innerBlocks.length),
  };
});

const withColumnControls = withDispatch((dispatch, ownProps, registry) => {
  return {
    updateWidth(width, breakpoint) {
      const { clientId } = ownProps;
      const { updateBlockAttributes } = dispatch('core/block-editor');
      const { getBlockRootClientId, getBlock, getBlocks } = registry.select(
        'core/block-editor',
      );

      // Constrain or expand siblings to account for gain or loss of
      // total columns area.
      const block = getBlock(clientId);
      const columns = getBlocks(getBlockRootClientId(clientId));
      const adjacentColumns = getAdjacentBlocks(columns, clientId);

      // Only adjust widths for desktop values.
      if (breakpoint !== BREAKPOINT_NAMES.desktop) {
        updateBlockAttributes(clientId, {
          width: {
            ...block.attributes.width,
            [breakpoint]: toWidthPrecision(width),
          },
        });

        return;
      }

      // The occupied width is calculated as the sum of the new width
      // and the total width of blocks _not_ in the adjacent set.
      const occupiedWidth =
        width +
        getTotalColumnsWidth({
          blocks: difference(columns, [
            find(columns, { clientId }),
            ...adjacentColumns,
          ]),
          breakpoint,
        });

      // Compute _all_ next column widths, in case the updated column
      // is in the middle of a set of columns which don't yet have
      // any explicit widths assigned (include updates to those not
      // part of the adjacent blocks).
      const nextColumnWidths = {
        ...getColumnWidths({
          blocks: columns,
          totalBlockCount: columns.length,
          breakpoint,
        }),
        [clientId]: {
          ...block.attributes.width,
          [breakpoint]: toWidthPrecision(width),
        },
        ...getRedistributedColumnWidths({
          blocks: adjacentColumns,
          availableWidth: 100 - occupiedWidth,
          totalBlockCount: columns.length,
          breakpoint,
        }),
      };

      forEach(nextColumnWidths, (nextColumnWidth, columnClientId) => {
        updateBlockAttributes(columnClientId, { width: nextColumnWidth });
      });
    },
  };
});

export default compose(
  withInnerBlocksCheck,
  withColumnControls,
)(ColumnBlockEdit);
