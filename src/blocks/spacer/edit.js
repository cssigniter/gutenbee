import classNames from 'classnames';
import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { InspectorControls } from 'wp.blockEditor';
import { RangeControl, PanelBody, ResizableBox } from 'wp.components';
import { compose, withInstanceId } from 'wp.compose';
import { withDispatch } from 'wp.data';

import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import useUniqueId from '../../hooks/useUniqueId';

const SpacerEdit = ({
  attributes,
  isSelected,
  setAttributes,
  instanceId,
  onResizeStart,
  onResizeStop,
  clientId,
}) => {
  const { height } = attributes;
  const id = `block-spacer-height-input-${instanceId}`;

  useUniqueId({ attributes, setAttributes, clientId });

  return (
    <Fragment>
      <ResizableBox
        className={classNames('block-library-spacer__resize-container', {
          'is-selected': isSelected,
        })}
        size={{
          height: height.desktop,
        }}
        minHeight="20"
        enable={{
          top: false,
          right: false,
          bottom: true,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        onResizeStart={onResizeStart}
        onResizeStop={(event, direction, elt, delta) => {
          onResizeStop();
          const spacerHeight = parseInt(height.desktop + delta.height, 10);

          setAttributes({
            height: {
              ...height,
              desktop: spacerHeight,
            },
          });
        }}
      />

      <InspectorControls>
        <PanelBody title={__('Spacer Settings')}>
          <ResponsiveControl>
            {breakpoint => (
              <RangeControl
                id={id}
                label={__('Height in pixels')}
                onChange={value =>
                  setAttributes({
                    height: {
                      ...height,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
                min={10}
                max={500}
                step={10}
                value={height[breakpoint]}
              />
            )}
          </ResponsiveControl>
        </PanelBody>
      </InspectorControls>
    </Fragment>
  );
};

export default compose(
  withDispatch(dispatch => {
    const { toggleSelection } = dispatch('core/block-editor');

    return {
      onResizeStart: () => toggleSelection(false),
      onResizeStop: () => toggleSelection(true),
    };
  }),
  withInstanceId,
)(SpacerEdit);
