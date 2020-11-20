import { Fragment, useState } from 'wp.element';
import classNames from 'classnames';
import { __ } from 'wp.i18n';
import { InspectorControls, InnerBlocks } from 'wp.blockEditor';
import {
  PanelBody,
  RangeControl,
  SelectControl,
  TextControl,
  ToggleControl,
} from 'wp.components';
import { useSelect } from 'wp.data';

import useUniqueId from '../../hooks/useUniqueId';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import { getBackgroundImageStyle } from '../../components/controls/background-controls/helpers';
import MarginControls from '../../components/controls/margin-controls';
import BannerStyle from './style';
import BackgroundControls from '../../components/controls/background-controls';
import getBlockId from '../../util/getBlockId';

import BorderControls from '../../components/controls/border-controls';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import { getVideoInfo } from './utils';
import VideoBackground from './VideoBackground';

const BannerBlockEdit = ({
  attributes,
  setAttributes,
  clientId,
  className,
}) => {
  useUniqueId({ attributes, setAttributes, clientId });
  const {
    uniqueId,
    bannerUrl,
    newTab,
    textColor,
    backgroundColor,
    backgroundVideoURL,
    backgroundImage,
    overlayBackgroundColor,
    bannerHeight,
    verticalContentAlignment,
    horizontalContentAlignment,
  } = attributes;

  const hasInnerBlocks = useSelect(
    select => {
      const { getBlock } = select('core/block-editor');
      const block = getBlock(clientId);
      return !!(block && block.innerBlocks.length);
    },
    [clientId],
  );

  const [videoInfo, setVideoInfo] = useState(
    backgroundVideoURL ? getVideoInfo(backgroundVideoURL) : null,
  );

  const onBackgroundVideoUrlChange = newUrl => {
    setAttributes({
      backgroundVideoURL: newUrl,
    });
    setVideoInfo(getVideoInfo(newUrl));
  };

  const blockId = getBlockId(uniqueId);

  const classes = classNames(blockId, className);

  const baseClass = 'wp-block-gutenbee-banner';

  return (
    <Fragment>
      <div
        className={classes}
        style={{
          color: textColor,
        }}
      >
        {bannerUrl && <span className={`${baseClass}-link-placeholder`} />}
        <div className={`${baseClass}-inner`}>
          <InnerBlocks
            templateLock={false}
            renderAppender={
              hasInnerBlocks
                ? undefined
                : () => <InnerBlocks.ButtonBlockAppender />
            }
          />
        </div>
        {overlayBackgroundColor && (
          <div
            className={`${baseClass}-background-overlay`}
            style={{
              backgroundColor: overlayBackgroundColor,
            }}
          />
        )}
        <div
          className={`${baseClass}-background`}
          style={{
            backgroundColor,
            ...getBackgroundImageStyle(backgroundImage),
            ...getBorderCSSValue({ attributes }),
            ...getBoxShadowCSSValue({ attributes }),
          }}
        >
          {backgroundVideoURL &&
            !['unsupported'].includes(videoInfo.provider) && (
              <VideoBackground
                key={backgroundVideoURL}
                url={backgroundVideoURL}
                videoInfo={videoInfo}
              />
            )}
        </div>
        <BannerStyle attributes={attributes} />
      </div>
      <InspectorControls>
        <PanelBody title={__('Layout Settings')} initialOpen>
          <ResponsiveControl>
            {breakpoint => (
              <Fragment>
                <RangeControl
                  label={__('Banner Height (px)')}
                  min={-1}
                  max={1200}
                  value={bannerHeight[breakpoint]}
                  onChange={value =>
                    setAttributes({
                      bannerHeight: {
                        ...bannerHeight,
                        [breakpoint]: value != null ? value : '',
                      },
                    })
                  }
                  step={1}
                  help={__(
                    'Leave blank for auto height or set to -1 for full viewport height.',
                  )}
                />
              </Fragment>
            )}
          </ResponsiveControl>

          <ResponsiveControl>
            {breakpoint => (
              <SelectControl
                label={__('Vertical Content Alignment')}
                value={verticalContentAlignment[breakpoint]}
                options={[
                  { value: '', label: '' },
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
                help={__(
                  'The content alignment settings apply when Banner Height is set.',
                )}
              />
            )}
          </ResponsiveControl>
        </PanelBody>

        <PanelBody title={__('Link Settings')} initialOpen={false}>
          <TextControl
            label={__('Banner URL')}
            value={bannerUrl}
            onChange={value => setAttributes({ bannerUrl: value })}
            type="url"
            placeholder="https://"
          />
          <ToggleControl
            label={__('Open in new tab')}
            checked={!!newTab}
            onChange={() => setAttributes({ newTab: !newTab })}
            help={
              newTab
                ? __('Opens link in new tab.')
                : __('Toggle to open link in new tab.')
            }
          />
        </PanelBody>

        <PanelBody title={__('Block Appearance')} initialOpen={false}>
          <PopoverColorControl
            value={textColor}
            defaultValue={textColor || ''}
            label={__('Text Color')}
            onChange={value => {
              setAttributes({ textColor: value });
            }}
          />

          {backgroundVideoURL &&
            !['youtube', 'vimeo'].includes(videoInfo.provider) && (
              <span className="gutenbee-embed-error">
                {__('Embed URL error. Please enter a YouTube or Vimeo URL.')}
              </span>
            )}
          <TextControl
            label={__('Video Background URL.')}
            onChange={onBackgroundVideoUrlChange}
            type="text"
            value={backgroundVideoURL}
          />
          {backgroundVideoURL && (
            <span className="gutenbee-controls-notice">
              {__(
                'Make sure you set a background image below when using this option. The image will appear before the video starts playing and on mobile devices where background videos are not available.',
              )}
            </span>
          )}

          <PopoverColorControl
            value={backgroundColor}
            defaultValue={backgroundColor || ''}
            label={__('Background Color')}
            onChange={value => {
              setAttributes({ backgroundColor: value });
            }}
          />

          <PopoverColorControl
            label={__('Background Overlay Color')}
            value={overlayBackgroundColor || ''}
            defaultValue={overlayBackgroundColor || ''}
            onChange={value => setAttributes({ overlayBackgroundColor: value })}
          />

          <BackgroundControls
            label={__('Background Image')}
            setAttributes={setAttributes}
            attributes={attributes}
            attributeKey="backgroundImage"
            supportsParallax
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
      </InspectorControls>
    </Fragment>
  );
};

export default BannerBlockEdit;
