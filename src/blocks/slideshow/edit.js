import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  ToggleControl,
  RangeControl,
  RadioControl,
  PanelBody,
  Notice,
} from 'wp.components';
import { InspectorControls } from 'wp.blockEditor';
import classNames from 'classnames';

import MarginControls from '../../components/controls/margin-controls';
import Slideshow from '../../components/slideshow/Slideshow';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import SlideshowStyle from './style';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import BorderControls from '../../components/controls/border-controls';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

const propTypes = {
  attributes: PropTypes.shape({
    arrowNav: PropTypes.bool,
    dotNav: PropTypes.bool,
    autoplay: PropTypes.bool,
    animationStyle: PropTypes.string,
    infinite: PropTypes.bool,
    speed: PropTypes.number,
    autoplaySpeed: PropTypes.number,
    slidesToShow: PropTypes.number,
    slidesToScroll: PropTypes.number,
    pauseOnHover: PropTypes.bool,
    blockMargin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
    arrowsColor: PropTypes.string,
    dotsColor: PropTypes.string,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  setAttributes: PropTypes.func.isRequired,
  clientId: PropTypes.string,
};

const SlideshowEdit = ({
  attributes,
  isSelected,
  className,
  setAttributes,
  clientId,
}) => {
  const {
    uniqueId,
    arrowNav,
    dotNav,
    autoplay,
    animationStyle,
    infinite,
    speed,
    autoplaySpeed,
    slidesToShow,
    slidesToScroll,
    pauseOnHover,
    arrowsColor,
    arrowsBackgroundColor,
    dotsColor,
    dotsBackgroundColor,
    backgroundColor,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <Slideshow
        id={blockId}
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
        )}
        attributes={attributes}
        setAttributes={setAttributes}
        isSelected={isSelected}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <SlideshowStyle attributes={attributes} />
        {isSelected && (
          <InspectorControls>
            <PanelBody title={__('Slideshow Settings')}>
              <ToggleControl
                label={__('Autoplay')}
                checked={autoplay}
                onChange={() => {
                  setAttributes({ autoplay: !autoplay });
                }}
              />
              <ToggleControl
                label={__('Infinite Slide')}
                checked={infinite}
                onChange={() => {
                  setAttributes({ infinite: !infinite });
                }}
              />
              <ToggleControl
                label={__('Arrow Navigation')}
                checked={arrowNav}
                onChange={() => {
                  setAttributes({ arrowNav: !arrowNav });
                }}
              />
              <ToggleControl
                label={__('Dot Navigation')}
                checked={dotNav}
                onChange={() => {
                  setAttributes({ dotNav: !dotNav });
                }}
              />

              <h2>{__('Animation Settings')}</h2>
              <RadioControl
                label={__('Animation Style')}
                selected={animationStyle}
                options={[
                  { label: 'Fade', value: 'fade' },
                  { label: 'Slide', value: 'slide' },
                ]}
                onChange={value => {
                  if (value === 'fade') {
                    setAttributes({
                      animationStyle: value,
                      slidesToScroll: 1,
                      slidesToShow: 1,
                    });
                    return;
                  }

                  setAttributes({ animationStyle: value });
                }}
              />

              {animationStyle === 'fade' &&
                (slidesToShow > 1 || slidesToScroll > 1) && (
                  <Notice
                    status="info"
                    isDismissible={false}
                    style={{ margin: '0 0 15px' }}
                  >
                    {__(
                      'The "fade" animation style works correctly only when displaying 1 slide at a time, please check your "Slides to show" and "Slides to scroll settings, they should be 1.',
                    )}
                  </Notice>
                )}

              {animationStyle === 'slide' && (
                <Fragment>
                  <RangeControl
                    label={__('Slides to Show')}
                    min={1}
                    max={10}
                    value={slidesToShow}
                    onChange={value => {
                      setAttributes({ slidesToShow: value });
                    }}
                    step={1}
                    disabled={animationStyle === 'fade'}
                  />

                  <RangeControl
                    label={__('Slides to Scroll')}
                    min={1}
                    max={10}
                    value={slidesToScroll}
                    onChange={value => {
                      setAttributes({ slidesToScroll: value });
                    }}
                    step={1}
                    disabled={animationStyle === 'fade'}
                  />
                </Fragment>
              )}

              <RangeControl
                label={__('Animation Speed (ms)')}
                min={50}
                max={5000}
                value={speed}
                onChange={value => {
                  setAttributes({ speed: value });
                }}
                step={1}
              />
              <RangeControl
                label={__('Autoplay Speed (ms)')}
                min={500}
                max={10000}
                value={autoplaySpeed}
                onChange={value => {
                  setAttributes({ autoplaySpeed: value });
                }}
                step={1}
              />
              <ToggleControl
                label={__('Pause on Hover')}
                checked={pauseOnHover}
                onChange={value => {
                  setAttributes({ pauseOnHover: value });
                }}
              />
            </PanelBody>

            <PanelBody initialOpen={false} title={__('Navigation Appearance')}>
              <PopoverColorControl
                label={__('Arrow Navigation Color')}
                value={arrowsColor || ''}
                defaultValue={arrowsColor || ''}
                onChange={value => setAttributes({ arrowsColor: value })}
              />

              <PopoverColorControl
                label={__('Arrow Background Color')}
                value={arrowsBackgroundColor || ''}
                defaultValue={arrowsBackgroundColor || ''}
                onChange={value =>
                  setAttributes({ arrowsBackgroundColor: value })
                }
              />

              <PopoverColorControl
                label={__('Dot Navigation Color')}
                value={dotsColor || ''}
                defaultValue={dotsColor || ''}
                onChange={value => setAttributes({ dotsColor: value })}
              />

              <PopoverColorControl
                label={__('Dot Background Color')}
                value={dotsBackgroundColor || ''}
                defaultValue={dotsBackgroundColor || ''}
                onChange={value =>
                  setAttributes({ dotsBackgroundColor: value })
                }
              />
            </PanelBody>

            <PanelBody title={__('Block Appearance')} initialOpen={false}>
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
        )}
      </Slideshow>
    </Fragment>
  );
};

SlideshowEdit.propTypes = propTypes;

export default SlideshowEdit;
