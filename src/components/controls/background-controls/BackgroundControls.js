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
  label = __('Background'),
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
                  <Button isDefault onClick={open}>
                    {__('Choose Image')}
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
                      <Button isDefault onClick={open}>
                        {__('Change')}
                      </Button>

                      <Button
                        isDefault
                        onClick={() =>
                          onSetBackgroundImageSetting({ url: '', image: null })
                        }
                      >
                        {__('Remove')}
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
          label={__('Image Repeat')}
          value={repeat}
          options={[
            { value: 'no-repeat', label: __('No repeat') },
            { value: 'repeat', label: __('Tile') },
            { value: 'repeat-x', label: __('Tile Horizontally') },
            { value: 'repeat-y', label: __('Tile Vertically') },
          ]}
          onChange={value => onSetBackgroundImageSetting({ repeat: value })}
        />

        <SelectControl
          label={__('Image Position')}
          value={position}
          options={[
            { value: 'left top', label: __('Top left') },
            { value: 'center top', label: __('Top center') },
            { value: 'right top', label: __('Top right') },
            { value: 'left center', label: __('Center left') },
            { value: 'center center', label: __('Center') },
            { value: 'right center', label: __('Center right') },
            { value: 'left bottom', label: __('Bottom left') },
            { value: 'center bottom', label: __('Bottom center') },
            { value: 'right bottom', label: __('Bottom right') },
          ]}
          onChange={value => onSetBackgroundImageSetting({ position: value })}
        />
      </div>

      <div className="ci-split-field">
        <SelectControl
          label={__('Image Attachment')}
          value={attachment}
          options={[
            { value: 'scroll', label: __('Scroll') },
            { value: 'fixed', label: __('Fixed') },
          ]}
          onChange={value => onSetBackgroundImageSetting({ attachment: value })}
        />

        <SelectControl
          label={__('Image Size')}
          value={size}
          options={[
            { value: 'cover', label: __('Cover') },
            { value: 'contain', label: __('Contain') },
            { value: 'auto', label: __('Auto') },
          ]}
          onChange={value => onSetBackgroundImageSetting({ size: value })}
        />
      </div>

      <hr />

      {onZoomChange && !backgroundVideoUrlValue && (
        <ToggleControl
          label={__('Enable zoom')}
          checked={zoomValue}
          onChange={value => onZoomChange(value)}
          help={
            zoomValue
              ? __(
                  'The background image zooms when hovered. Parallax must be disabled.',
                )
              : __(
                  'Toggle to enable background image zoom. Parallax must be disabled.',
                )
          }
        />
      )}

      {onParallaxChange && (
        <Fragment>
          <ToggleControl
            label={__('Enable Parallax')}
            checked={parallax}
            onChange={value =>
              onParallaxChange({
                ...parallaxValue,
                parallax: value,
              })
            }
          />

          <RangeControl
            label={__('Parallax Speed')}
            value={parallaxSpeed}
            min={0}
            max={1}
            step={0.1}
            onChange={value =>
              onParallaxChange({ ...parallaxValue, parallaxSpeed: value })
            }
          />
        </Fragment>
      )}
    </div>
  );
};

BackgroundControls.propTypes = propTypes;

export default BackgroundControls;
