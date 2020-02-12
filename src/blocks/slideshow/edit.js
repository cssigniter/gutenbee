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
import { InspectorControls, PanelColorSettings } from 'wp.blockEditor';

import MarginControls from '../../components/controls/margin-controls';
import Slideshow from '../../components/slideshow/Slideshow';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import SlideshowStyle from './style';

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
    dotsColor,
    backgroundColor,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <Slideshow
        id={blockId}
        className={className}
        attributes={attributes}
        setAttributes={setAttributes}
        isSelected={isSelected}
        style={{
          backgroundColor: backgroundColor || undefined,
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

            <PanelColorSettings
              initialOpen={false}
              title={__('Navigation Appearance')}
              colorSettings={[
                {
                  value: arrowsColor,
                  onChange: color => setAttributes({ arrowsColor: color }),
                  label: __('Arrow Navigation Color'),
                },
                {
                  value: dotsColor,
                  onChange: color => setAttributes({ dotsColor: color }),
                  label: __('Dot Navigation Color'),
                },
              ]}
            />

            <PanelColorSettings
              title={__('Block Appearance')}
              initialOpen={false}
              colorSettings={[
                {
                  value: backgroundColor,
                  onChange: value => setAttributes({ backgroundColor: value }),
                  label: __('Background Color'),
                },
              ]}
              onChange={value => setAttributes({ backgroundColor: value })}
            >
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
            </PanelColorSettings>
          </InspectorControls>
        )}
      </Slideshow>
    </Fragment>
  );
};

SlideshowEdit.propTypes = propTypes;

export default SlideshowEdit;
