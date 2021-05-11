import PropTypes from 'prop-types';
import { Fragment, useState } from 'wp.element';
import {
  BlockControls,
  AlignmentToolbar,
  MediaPlaceholder,
  BlockIcon,
} from 'wp.blockEditor';
import {
  BlockQuotation,
  PanelBody,
  SelectControl,
  Toolbar,
  Button,
  TextareaControl,
  RangeControl,
} from 'wp.components';
import { compose } from 'wp.compose';
import { withSelect } from 'wp.data';
import { __ } from 'wp.i18n';
import classNames from 'classnames';
import { pick, get, map, isEmpty } from 'lodash';
import { RichText, InspectorControls } from 'wp.blockEditor';
import { image as imageIcon } from '@wordpress/icons';

import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import { getDefaultResponsiveValue } from '../../components/controls/responsive-control/default-values';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import MarginControls from '../../components/controls/margin-controls';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import BorderControls from '../../components/controls/border-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import FontSizePickerLabel from '../../components/controls/text-controls/FontSizePickerLabel';
import getBlockId from '../../util/getBlockId';
import useUniqueId from '../../hooks/useUniqueId';
import TestimonialStyle from './style';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  className: PropTypes.string,
  imageSizes: PropTypes.object,
  image: PropTypes.object,
  onReplace: PropTypes.func,
};

export const pickRelevantMediaFiles = image => {
  const imageProps = pick(image, ['alt', 'id']);
  imageProps.url =
    get(image, ['sizes', 'large', 'url']) ||
    get(image, ['media_details', 'sizes', 'large', 'source_url']) ||
    image.url;

  return imageProps;
};

const TestimonialEdit = ({
  attributes,
  className,
  setAttributes,
  isSelected,
  clientId,
  imageSizes,
  image,
  onReplace,
}) => {
  const {
    uniqueId,
    url,
    alt,
    id,
    width,
    content,
    citation,
    sizeSlug,
    info,
    align,
    textColor,
    backgroundColor,
    avatarPosition,
    contentSize,
    citationSize,
    infoSize,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;
  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  const [isEditing, setIsEditing] = useState(!url);
  const toggleIsEditing = () => setIsEditing(prev => !prev);

  const labels = {
    title: !url ? __('Image') : __('Edit image'),
    instructions: __('Pick an image file from your media library.'),
  };

  const onImageSelect = media => {
    if (!media || !media.url) {
      setAttributes({
        url: undefined,
        alt: undefined,
        id: undefined,
        title: undefined,
      });

      return;
    }

    setIsEditing(false);

    const mediaAttributes = pickRelevantMediaFiles(media);

    // Reset the dimension attributes if changing to a different image.
    if (!media.id || media.id !== id) {
      setAttributes({
        ...mediaAttributes,
      });
    } else {
      setAttributes({
        ...mediaAttributes,
        url,
      });
    }
  };

  const onImageSizeUpdate = sizeSlug => {
    const url = get(image, ['media_details', 'sizes', sizeSlug, 'source_url']);

    if (!url) {
      return null;
    }

    setAttributes({
      url,
      width: getDefaultResponsiveValue(),
      sizeSlug,
    });
  };

  const onImageClick = () => {};

  const imageSizeOptions = (() => {
    return map(imageSizes, ({ name, slug }) => ({ value: slug, label: name }));
  })();

  const mediaPreview = !!url && (
    <img
      alt={__('Edit image')}
      title={__('Edit image')}
      className="edit-image-preview"
      src={url}
    />
  );

  const mediaUploader = (
    <MediaPlaceholder
      icon={<BlockIcon icon={imageIcon} />}
      labels={labels}
      onSelect={onImageSelect}
      allowedTypes={['image']}
      value={{ id, src: url }}
      mediaPreview={mediaPreview}
      disableMediaButtons={!isEditing && url}
      onDoubleClick={toggleIsEditing}
      onCancel={!!url && toggleIsEditing}
    />
  );

  const blockProps = {
    id: blockId,
    className: classNames(
      className,
      blockId,
      getBreakpointVisibilityClassNames(blockBreakpointVisibility),
      getAuthVisibilityClasses(blockAuthVisibility),
      {
        [`has-text-align-${align}`]: align,
        [`gutenbee-testimonial-avatar-${avatarPosition}`]: avatarPosition,
      },
    ),
  };

  const POSITIONS = {
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left',
  };

  const classes = classNames({
    'gutenbee-testimonial-avatar': true,
    [`size-${sizeSlug}`]: sizeSlug,
  });

  const renderAvatar = (
    <Fragment>
      {!isEditing && url && (
        <figure className={classes}>
          <img
            src={url}
            alt={alt}
            onDoubleClick={toggleIsEditing}
            onClick={onImageClick}
          />
        </figure>
      )}
      {mediaUploader}
    </Fragment>
  );

  const renderContent = () => {
    return (
      <div className="wp-block-testimonial-content-wrapper">
        <RichText
          identifier="value"
          multiline
          value={content}
          onChange={nextContent =>
            setAttributes({
              content: nextContent,
            })
          }
          onRemove={forward => {
            const hasEmptyCitation = !citation || citation.length === 0;
            if (!forward && hasEmptyCitation) {
              onReplace([]);
            }
          }}
          placeholder={
            // translators: placeholder text used for the quote
            __('Write quote…')
          }
          textAlign={align}
        />
      </div>
    );
  };

  const renderCitation = () => {
    return (
      <Fragment>
        {(!RichText.isEmpty(citation) || isSelected) && (
          <RichText
            identifier="citation"
            value={citation}
            onChange={nextCitation =>
              setAttributes({
                citation: nextCitation,
              })
            }
            __unstableMobileNoFocusOnMount
            placeholder={
              // translators: placeholder text used for the citation
              __('Write citation…')
            }
            className="gutenbee-block-testimonial__citation"
            textAlign={align}
          />
        )}
      </Fragment>
    );
  };

  const renderInfo = () => {
    return (
      <Fragment>
        {(!RichText.isEmpty(info) || isSelected) && (
          <RichText
            identifier="info"
            value={info}
            onChange={nextInfo =>
              setAttributes({
                info: nextInfo,
              })
            }
            __unstableMobileNoFocusOnMount
            placeholder={
              // translators: placeholder text used for the citation
              __('Author information…')
            }
            className="gutenbee-block-testimonial__info"
            textAlign={align}
            style={{
              color: textColor ? textColor : undefined,
            }}
          />
        )}
      </Fragment>
    );
  };

  const renderTestimonialLayout = () => {
    if (['left', 'right'].includes(avatarPosition)) {
      return (
        <Fragment>
          {renderAvatar}
          <div className="gutenbee-testimonial-content-citation-wrapper">
            {renderContent()}
            {renderCitation()}
            {renderInfo()}
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {renderAvatar}
          {renderContent()}
          {renderCitation()}
          {renderInfo()}
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      <BlockQuotation
        {...blockProps}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
          color: textColor ? textColor : undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        {renderTestimonialLayout()}
        <TestimonialStyle attributes={attributes} />
      </BlockQuotation>

      <BlockControls>
        <AlignmentToolbar
          value={attributes.align}
          onChange={newalign => setAttributes({ align: newalign })}
        />

        {url && (
          <Fragment>
            <Toolbar>
              <Button
                className={classNames(
                  'components-icon-button components-toolbar__control',
                  { 'is-active': isEditing },
                )}
                label={__('Edit image')}
                aria-pressed={isEditing}
                onClick={toggleIsEditing}
                icon="format-image"
              />

              <Button
                className={classNames(
                  'components-icon-button components-toolbar__control',
                  { 'is-active': isEditing },
                )}
                label={__('Remove image')}
                aria-pressed={isEditing}
                onClick={onImageSelect}
                icon="trash"
              />
            </Toolbar>
          </Fragment>
        )}
      </BlockControls>
      <InspectorControls>
        <PanelBody title={__('Image Settings')} initialOpen={false}>
          <ResponsiveControl>
            {breakpoint => (
              <RangeControl
                className="range-control-size"
                label={__('Image Width')}
                value={width[breakpoint]}
                onChange={value => {
                  setAttributes({
                    width: {
                      ...width,
                      [breakpoint]: value != null ? value : '',
                    },
                  });
                }}
                min={10}
                max={2000}
                beforeIcon="format-image"
                afterIcon="format-image"
                allowReset
              />
            )}
          </ResponsiveControl>

          <TextareaControl
            label={__('Alt Text (Alternative Text)')}
            value={alt}
            onChange={value => setAttributes({ alt: value })}
          />

          {!isEmpty(imageSizeOptions) && (
            <SelectControl
              label={__('Image Size')}
              value={sizeSlug}
              options={imageSizeOptions}
              onChange={onImageSizeUpdate}
            />
          )}
        </PanelBody>

        <PanelBody
          title={__('Layout Options')}
          className="blocks-layout-options"
          initialOpen={false}
        >
          <SelectControl
            label={__('Avatar Position')}
            value={avatarPosition}
            onChange={value => setAttributes({ avatarPosition: value })}
            options={[
              { value: POSITIONS.TOP, label: __('Top') },
              { value: POSITIONS.RIGHT, label: __('Right') },
              { value: POSITIONS.BOTTOM, label: __('Bottom') },
              { value: POSITIONS.LEFT, label: __('Left') },
            ]}
          />
        </PanelBody>
        <PanelBody
          title={__('Text Settings')}
          initialOpen={false}
          className="blocks-font-size"
        >
          <ResponsiveControl>
            {breakpoint => (
              <FontSizePickerLabel
                label={__('Content Font Size')}
                value={contentSize[breakpoint]}
                onChange={value =>
                  setAttributes({
                    contentSize: {
                      ...contentSize,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>
          <ResponsiveControl>
            {breakpoint => (
              <FontSizePickerLabel
                label={__('Citation Font Size')}
                value={citationSize[breakpoint]}
                onChange={value =>
                  setAttributes({
                    citationSize: {
                      ...citationSize,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>
          <ResponsiveControl>
            {breakpoint => (
              <FontSizePickerLabel
                label={__('Info Font Size')}
                value={infoSize[breakpoint]}
                onChange={value =>
                  setAttributes({
                    infoSize: {
                      ...infoSize,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>
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
          <PopoverColorControl
            value={backgroundColor}
            defaultValue={backgroundColor || ''}
            label={__('Background Color')}
            onChange={value => {
              setAttributes({ backgroundColor: value });
            }}
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
    </Fragment>
  );
};

TestimonialEdit.propTypes = propTypes;

export default compose(
  withSelect((select, props) => {
    const { getMedia } = select('core');
    const { getSettings } = select('core/block-editor');
    const {
      attributes: { id },
      isSelected,
    } = props;
    const { mediaUpload, imageSizes, isRTL, maxWidth } = getSettings();

    return {
      image: id && isSelected ? getMedia(id) : null,
      maxWidth,
      isRTL,
      imageSizes,
      mediaUpload,
    };
  }),
)(TestimonialEdit);
