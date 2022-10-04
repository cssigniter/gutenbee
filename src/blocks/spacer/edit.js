import classNames from 'classnames';
import { Fragment, useState } from 'wp.element';
import { __ } from 'wp.i18n';
import { InspectorControls } from 'wp.blockEditor';
import { RangeControl, PanelBody, ResizableBox } from 'wp.components';

import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import SpacerStyle from './style';
import BackgroundControls from '../../components/controls/background-controls/BackgroundControls';
import MarginControls from '../../components/controls/margin-controls';
import BorderControls from '../../components/controls/border-controls';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';
import Rule from '../../components/stylesheet/Rule';

const ResizableSpacer = ({
  orientation,
  onResizeStart,
  onResize,
  onResizeStop,
  isSelected,
  isResizing,
  setIsResizing,
  ...props
}) => {
  const getCurrentSize = elt => {
    return orientation === 'horizontal' ? elt.clientWidth : elt.clientHeight;
  };

  const getNextVal = elt => {
    return getCurrentSize(elt);
  };

  return (
    <ResizableBox
      onResizeStart={(_event, _direction, elt) => {
        const nextVal = getNextVal(elt);
        onResizeStart(nextVal);
        onResize(nextVal);
      }}
      onResize={(_event, _direction, elt) => {
        if (!isResizing) {
          setIsResizing(true);
        }
        onResize(getNextVal(elt));
      }}
      onResizeStop={(_event, _direction, elt) => {
        const nextVal = getCurrentSize(elt);
        onResizeStop(nextVal);
        setIsResizing(false);
      }}
      __experimentalShowTooltip={true}
      __experimentalTooltipProps={{
        axis: orientation === 'horizontal' ? 'x' : 'y',
        position: 'corner',
        isVisible: isResizing,
      }}
      showHandle={isSelected}
      {...props}
    />
  );
};

const SpacerEdit = ({
  attributes,
  isSelected,
  setAttributes,
  instanceId,
  clientId,
  className,
  toggleSelection,
}) => {
  const {
    height,
    backgroundColor,
    backgroundImage,
    backgroundImageEffects,
    uniqueId,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;
  const id = `block-spacer-height-input-${instanceId}`;

  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  const [isResizing, setIsResizing] = useState(false);
  const [temporaryHeight, setTemporaryHeight] = useState(null);

  const onResizeStart = () => toggleSelection(false);
  const onResizeStop = () => toggleSelection(true);

  const handleOnVerticalResizeStop = newHeight => {
    onResizeStop();

    setAttributes({
      height: {
        ...height,
        desktop: parseInt(newHeight, 10),
      },
    });
    setTemporaryHeight(null);
  };

  return (
    <Fragment>
      <SpacerStyle attributes={attributes}>
        <Rule
          value={backgroundImage}
          rule=".wp-block-gutenbee-spacer.[root] { %s }"
        />
      </SpacerStyle>
      <div style={{ height: temporaryHeight || height.desktop || 20 }}>
        <ResizableSpacer
          style={{
            backgroundColor: backgroundColor || undefined,
            ...getBorderCSSValue({ attributes }),
            ...getBoxShadowCSSValue({ attributes }),
          }}
          className={classNames(
            className,
            blockId,
            getBreakpointVisibilityClassNames(blockBreakpointVisibility),
            getAuthVisibilityClasses(blockAuthVisibility),
            'block-library-spacer__resize-container',
            {
              'is-resizing': isResizing,
              'is-selected': isSelected,
              'resize-horizontal': false,
            },
          )}
          minHeight={20}
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
          orientation="vertical"
          onResizeStart={onResizeStart}
          onResize={setTemporaryHeight}
          onResizeStop={handleOnVerticalResizeStop}
          isSelected={isSelected}
          isResizing={isResizing}
          setIsResizing={setIsResizing}
        />
      </div>

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
                allowReset
                min={1}
                max={500}
                step={1}
                value={height[breakpoint]}
              />
            )}
          </ResponsiveControl>
        </PanelBody>

        <PanelBody title={__('Block Appearance')} initialOpen={false}>
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
                  parallaxValue={{
                    parallax: backgroundImageEffects.parallax,
                    parallaxSpeed: backgroundImageEffects.parallaxSpeed,
                  }}
                  onParallaxChange={value =>
                    setAttributes({
                      backgroundImageEffects: {
                        ...backgroundImageEffects,
                        ...value,
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
  );
};

export default SpacerEdit;
