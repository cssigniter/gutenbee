import { Component } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  ToggleControl,
  RangeControl,
  RadioControl,
  PanelBody,
} from 'wp.components';
import {
  InspectorControls,
  ColorPalette,
} from 'wp.editor';

import Gallery from '../../components/gallery/Gallery';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';
import MarginControls from '../../components/controls/margin-controls';

class SlideshowEdit extends Component {
  static propTypes = {
    attributes: PropTypes.shape({
      arrowNav: PropTypes.bool,
      dotNav: PropTypes.bool,
      autoplay: PropTypes.bool,
      animationStyle: PropTypes.string,
      infinite: PropTypes.bool,
      speed: PropTypes.number,
      autoplaySpeed: PropTypes.number,
      color: PropTypes.string,
      slidesToShow: PropTypes.number,
      slidesToScroll: PropTypes.number,
      pauseOnHover: PropTypes.bool,
      blockMargin: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
      }),
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    setAttributes: PropTypes.func.isRequired,
  };

  render() {
    const {
      attributes,
      isSelected,
      className,
      setAttributes,
    } = this.props;
    const {
      arrowNav,
      dotNav,
      autoplay,
      animationStyle,
      infinite,
      speed,
      autoplaySpeed,
      color,
      slidesToShow,
      slidesToScroll,
      pauseOnHover,
      blockMargin,
    } = attributes;

    return (
      <Gallery
        className={className}
        attributes={attributes}
        isSelected={isSelected}
        setAttributes={setAttributes}
        label={__('Slideshow')}
        style={{
          margin: getMarginSettingStyles(blockMargin),
        }}
      >
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
              <RangeControl
                label={__('Slides to Show')}
                min={1}
                max={10}
                value={slidesToShow}
                onChange={(value) => {
                  setAttributes({ slidesToShow: value });
                }}
                step={1}
              />
              <RangeControl
                label={__('Slides to Scroll')}
                min={1}
                max={10}
                value={slidesToScroll}
                onChange={(value) => {
                  setAttributes({ slidesToScroll: value });
                }}
                step={1}
              />

              <h2>{__('Animation Settings')}</h2>
              <RadioControl
                label={__('Animation Style')}
                selected={animationStyle}
                options={[
                  { label: 'Fade', value: 'fade' },
                  { label: 'Slide', value: 'slide' },
                ]}
                onChange={(value) => {
                  setAttributes({ animationStyle: value });
                }}
              />
              <RangeControl
                label={__('Animation Speed (ms)')}
                min={50}
                max={5000}
                value={speed}
                onChange={(value) => {
                  setAttributes({ speed: value });
                }}
                step={10}
              />
              <RangeControl
                label={__('Autoplay Speed (ms)')}
                min={500}
                max={10000}
                value={autoplaySpeed}
                onChange={(value) => {
                  setAttributes({ autoplaySpeed: value });
                }}
                step={10}
              />
              <ToggleControl
                label={__('Pause on Hover')}
                checked={pauseOnHover}
                onChange={(value) => {
                  setAttributes({ pauseOnHover: value });
                }}
              />

              <PanelBody title={__('Arrow and Dots Color')}>
                <ColorPalette
                  value={color}
                  onChange={value => setAttributes({ color: value })}
                />
              </PanelBody>
            </PanelBody>

            <PanelBody title={__('Appearance')} initialOpen={false}>
              <MarginControls
                attributeKey="blockMargin"
                attributes={attributes}
                setAttributes={setAttributes}
              />
            </PanelBody>
          </InspectorControls>
        )}
      </Gallery>
    );
  }
}

export default SlideshowEdit;
