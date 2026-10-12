import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { MediaUpload } from 'wp.blockEditor';
import {
  SelectControl,
  Button,
  ToggleControl,
  RangeControl,
} from 'wp.components';

const propTypes = {
  backgroundImageValue: PropTypes.shape({
    url: PropTypes.string,
    repeat: PropTypes.string,
    size: PropTypes.string,
    position: PropTypes.string,
    attachment: PropTypes.string,
  }),
  onBackgroundImageChange: PropTypes.func.isRequired,
  zoomValue: PropTypes.bool,
  onZoomChange: PropTypes.func,
  parallaxValue: PropTypes.shape({
    parallax: PropTypes.bool,
    parallaxSpeed: PropTypes.number,
  }),
  onParallaxChange: PropTypes.func,
  backgroundVideoUrlValue: PropTypes.string,
  label: PropTypes.node,
};

const BackgroundControls = ({
  backgroundImageValue,
  onBackgroundImageChange,
  zoomValue,
  onZoomChange,
  parallaxValue = {},
  onParallaxChange,
  backgroundVideoUrlValue,
  label = __('Background', 'gutenbee'),
}) => {
  const { url, repeat, size, position, attachment } =
    backgroundImageValue ?? {};
  const { parallax, parallaxSpeed } = parallaxValue;

  const onSetBackgroundImageSetting = setting => {
    onBackgroundImageChange({
      ...backgroundImageValue,
      ...setting,
    });
  };

  return (
    <div className="gutenbee-control-background">
      <p className="gutenbee-control-background-label">{label}</p>

      <div className="gutenbee-control-background-image-wrap">
        {!url ? (
          <MediaUpload
            onSelect={image => {
              onSetBackgroundImageSetting({
                url: image.url,
              });
            }}
            allowedTypes={['image']}
            render={({ open }) => {
              return (
                <div className="gutenbee-control-background-image-actions">
                  <Button variant="secondary" onClick={open}>
                    {__('Choose Image', 'gutenbee')}
                  </Button>
                </div>
              );
            }}
          />
        ) : (
          <Fragment>
            <MediaUpload
              onSelect={image => {
                onSetBackgroundImageSetting({
                  url: image.url,
                });
              }}
              allowedTypes={['image']}
              render={({ open }) => {
                return (
                  <Fragment>
                    <a
                      href="#"
                      className="gutenbee-control-background-image-placeholder"
                      onClick={open}
                    >
                      <img src={url} alt="" />
                    </a>

                    <div className="gutenbee-control-background-image-actions">
                      <Button variant="secondary" onClick={open}>
                        {__('Change', 'gutenbee')}
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() =>
                          onSetBackgroundImageSetting({ url: '', image: null })
                        }
                      >
                        {__('Remove', 'gutenbee')}
                      </Button>
                    </div>
                  </Fragment>
                );
              }}
            />
          </Fragment>
        )}
      </div>

      <div className="ci-split-field">
        <SelectControl
          label={__('Image Repeat', 'gutenbee')}
          value={repeat}
          options={[
            { value: 'no-repeat', label: __('No repeat', 'gutenbee') },
            { value: 'repeat', label: __('Tile', 'gutenbee') },
            { value: 'repeat-x', label: __('Tile Horizontally', 'gutenbee') },
            { value: 'repeat-y', label: __('Tile Vertically', 'gutenbee') },
          ]}
          onChange={value => onSetBackgroundImageSetting({ repeat: value })}
          __next40pxDefaultSize
          __nextHasNoMarginBottom
        />

        <SelectControl
          label={__('Image Position', 'gutenbee')}
          value={position}
          options={[
            { value: 'left top', label: __('Top left', 'gutenbee') },
            { value: 'center top', label: __('Top center', 'gutenbee') },
            { value: 'right top', label: __('Top right', 'gutenbee') },
            { value: 'left center', label: __('Center left', 'gutenbee') },
            { value: 'center center', label: __('Center', 'gutenbee') },
            { value: 'right center', label: __('Center right', 'gutenbee') },
            { value: 'left bottom', label: __('Bottom left', 'gutenbee') },
            { value: 'center bottom', label: __('Bottom center', 'gutenbee') },
            { value: 'right bottom', label: __('Bottom right', 'gutenbee') },
          ]}
          onChange={value => onSetBackgroundImageSetting({ position: value })}
          __next40pxDefaultSize
          __nextHasNoMarginBottom
        />
      </div>

      <div className="ci-split-field">
        <SelectControl
          label={__('Image Attachment', 'gutenbee')}
          value={attachment}
          options={[
            { value: 'scroll', label: __('Scroll', 'gutenbee') },
            { value: 'fixed', label: __('Fixed', 'gutenbee') },
          ]}
          onChange={value => onSetBackgroundImageSetting({ attachment: value })}
          __next40pxDefaultSize
          __nextHasNoMarginBottom
        />

        <SelectControl
          label={__('Image Size', 'gutenbee')}
          value={size}
          options={[
            { value: 'cover', label: __('Cover', 'gutenbee') },
            { value: 'contain', label: __('Contain', 'gutenbee') },
            { value: 'auto', label: __('Auto', 'gutenbee') },
          ]}
          onChange={value => onSetBackgroundImageSetting({ size: value })}
          __next40pxDefaultSize
          __nextHasNoMarginBottom
        />
      </div>

      <hr />

      {onZoomChange && !backgroundVideoUrlValue && (
        <ToggleControl
          label={__('Enable zoom', 'gutenbee')}
          checked={zoomValue}
          onChange={value => onZoomChange(value)}
          help={
            zoomValue
              ? __(
                  'The background image zooms when hovered. Parallax must be disabled.',
                  'gutenbee',
                )
              : __(
                  'Toggle to enable background image zoom. Parallax must be disabled.',
                  'gutenbee',
                )
          }
          __nextHasNoMarginBottom
        />
      )}

      {onParallaxChange && (
        <Fragment>
          <ToggleControl
            label={__('Enable Parallax', 'gutenbee')}
            checked={parallax}
            onChange={value =>
              onParallaxChange({
                ...parallaxValue,
                parallax: value,
              })
            }
            __nextHasNoMarginBottom
          />

          <RangeControl
            label={__('Parallax Speed', 'gutenbee')}
            value={parallaxSpeed}
            min={0}
            max={1}
            step={0.1}
            onChange={value =>
              onParallaxChange({ ...parallaxValue, parallaxSpeed: value })
            }
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
        </Fragment>
      )}
    </div>
  );
};

BackgroundControls.propTypes = propTypes;

export default BackgroundControls;
