import { Component } from 'wp.element';
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

class SlideshowEdit extends Component {
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
    } = attributes;

    return (
      <Gallery
        className={className}
        attributes={attributes}
        isSelected={isSelected}
        setAttributes={setAttributes}
        label={__('Slideshow')}
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

              <PanelBody title={__('Arrow and Dots Color')}>
                <ColorPalette
                  value={color}
                  onChange={value => setAttributes({ color: value })}
                />
              </PanelBody>
            </PanelBody>
          </InspectorControls>
        )}
      </Gallery>
    );
  }
}

export default SlideshowEdit;
