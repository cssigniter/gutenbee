import { Fragment } from 'wp.element';
import { __, sprintf } from 'wp.i18n';
import { PanelBody, Toolbar, RangeControl } from 'wp.components';
import { InspectorControls, AlignmentToolbar } from 'wp.blockEditor';

import { BORDER_STYLES, Divider } from './index';
import MarginControls from '../../components/controls/margin-controls';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import BackgroundControls from '../../components/controls/background-controls/BackgroundControls';
import useUniqueId from '../../hooks/useUniqueId';
import BorderControls from '../../components/controls/border-controls';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

const DividerEdit = ({
  className,
  attributes,
  setAttributes,
  isSelected,
  clientId,
}) => {
  const {
    style,
    weight,
    width,
    height,
    align,
    color,
    backgroundColor,
    blockBreakpointVisibility,
    blockAuthVisibility,
    backgroundImage,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  return (
    <Fragment>
      <Divider className={className} attributes={attributes} />

      {isSelected && (
        <InspectorControls key="inspector">
          <PanelBody>
            <p>{__('Style')}</p>
            <Toolbar
              classsName="wp-block-gutenbee-divider-style-edit"
              controls={Object.values(BORDER_STYLES).map(
                (borderStyle, index) => ({
                  icon: 'admin-appearance',
                  title: sprintf(__('Style %s'), borderStyle),
                  isActive: style === borderStyle,
                  onClick: () => setAttributes({ style: borderStyle }),
                  subscript: index + 1,
                }),
              )}
            />

            <RangeControl
              label={__('Weight (thickness)')}
              min={1}
              max={50}
              value={weight}
              onChange={value => setAttributes({ weight: value })}
            />

            <RangeControl
              label={__('Width (%)')}
              min={1}
              max={100}
              value={width}
              onChange={value => setAttributes({ width: value })}
            />

            <RangeControl
              label={__('Height (px)')}
              min={1}
              max={500}
              onChange={value => setAttributes({ height: value })}
              value={height}
            />

            <p>{__('Alignment')}</p>
            <AlignmentToolbar
              value={align}
              onChange={value => setAttributes({ align: value || 'left' })}
              isCollapsed={false}
            />
          </PanelBody>

          <PanelBody title={__('Block Appearance')} initialOpen={false}>
            <PopoverColorControl
              label={__('Color')}
              value={color || ''}
              defaultValue={color || ''}
              onChange={value => setAttributes({ color: value })}
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

export default DividerEdit;
