import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { compose } from 'wp.compose';
import {
  InnerBlocks,
  __experimentalBlockVariationPicker as ExperimentalBlockVariationPicker,
} from 'wp.blockEditor';
import { withDispatch, withSelect, useSelect, useDispatch } from 'wp.data';
import { createBlock } from 'wp.blocks';
import { times, dropRight, get } from 'lodash';
import classNames from 'classnames';

import { getBackgroundImageStyle } from '../../components/controls/background-controls/helpers';
import useUniqueId from '../../hooks/useUniqueId';
import ContainerStyle from './style';
import getBlockId from '../../util/getBlockId';
import {
  createBlocksFromInnerBlocksTemplate,
  getMappedColumnWidths,
  onVimeoApiReady,
  onYouTubeApiReady,
} from './utils';
import Rule from '../../components/stylesheet/Rule';
import ContainerInspectorControls from './inspector-controls';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import { useVideoEmbed } from '../../util/video/useVideoEmbed';
import VideoBackgroundEditor from '../../util/video/components/VideoBackgroundEditor';

const propTypes = {
  className: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  updateColumns: PropTypes.func.isRequired,
};

const ContainerBlockEdit = ({
  name,
  attributes,
  setAttributes,
  clientId,
  updateColumns,
  className,
}) => {
  const {
    uniqueId,
    textColor,
    backgroundColor,
    backgroundVideoURL,
    backgroundImage,
    columnDirection,
    overlayBackgroundColor,
  } = attributes;

  const { count, variations, blockType, defaultVariation } = useSelect(
    select => {
      const {
        getBlockVariations,
        getBlockType,
        getDefaultBlockVariation,
      } = select('core/blocks');

      return {
        count: select('core/block-editor').getBlockCount(clientId),
        variations: getBlockVariations(name, 'block'),
        defaultVariation: getDefaultBlockVariation(name, 'block'),
        blockType: getBlockType(name),
      };
    },
    [clientId, name],
  );
  const { replaceInnerBlocks, selectBlock } = useDispatch('core/block-editor');

  const hasInnerBlocks = count > 0;

  useUniqueId({
    attributes,
    setAttributes,
    clientId,
  });

  const blockId = getBlockId(uniqueId);
  const classes = classNames(className, blockId);

  const { videoInfo, videoEmbedRef, handleVideoUrlChange } = useVideoEmbed({
    url: backgroundVideoURL,
    onVideoUrlChange: url => {
      setAttributes({
        backgroundVideoURL: url,
      });
    },
    onYouTubeApiReady,
    onVimeoApiReady,
  });

  return (
    <Fragment>
      <ContainerStyle attributes={attributes}>
        <Rule
          value={columnDirection}
          rule=".wp-block-gutenbee-container.[root] .wp-block-gutenbee-container-row > .block-editor-inner-blocks > .block-editor-block-list__layout { flex-direction: %s; }"
        />
      </ContainerStyle>

      {hasInnerBlocks ? (
        <div
          id={blockId}
          className={classes}
          style={{
            color: textColor,
          }}
        >
          <div className={`${className}-inner`}>
            <div className={`${className}-row`}>
              <InnerBlocks
                allowedBlocks={['gutenbee/column']}
                __experimentalMoverDirection="horizontal"
                orientation="horizontal"
                __experimentalPassedProps={{}}
              />
            </div>
          </div>

          {overlayBackgroundColor && (
            <div
              className={`${className}-background-overlay`}
              style={{
                backgroundColor: overlayBackgroundColor,
              }}
            />
          )}
          <div
            className={`${className}-background`}
            style={{
              backgroundColor,
              ...getBackgroundImageStyle(backgroundImage),
              ...getBorderCSSValue({ attributes }),
              ...getBoxShadowCSSValue({ attributes }),
            }}
          >
            {backgroundVideoURL &&
              !['unsupported'].includes(videoInfo.provider) && (
                <VideoBackgroundEditor
                  key={backgroundVideoURL}
                  videoInfo={videoInfo}
                  videoEmbedRef={videoEmbedRef}
                />
              )}
          </div>
        </div>
      ) : (
        <div>
          <ExperimentalBlockVariationPicker
            icon={get(blockType, ['icon', 'src'])}
            label={get(blockType, ['title'])}
            variations={variations}
            onSelect={(nextVariation = defaultVariation) => {
              if (nextVariation.attributes) {
                setAttributes(nextVariation.attributes);
              }

              if (nextVariation.innerBlocks) {
                replaceInnerBlocks(
                  clientId,
                  createBlocksFromInnerBlocksTemplate(
                    nextVariation.innerBlocks,
                  ),
                );
              }

              selectBlock(clientId);
            }}
            allowSkip
          />
        </div>
      )}

      {hasInnerBlocks && (
        <ContainerInspectorControls
          attributes={attributes}
          setAttributes={setAttributes}
          updateColumns={updateColumns}
          columnCount={count}
          videoInfo={videoInfo}
          handleBackgroundVideoUrlChange={handleVideoUrlChange}
        />
      )}
    </Fragment>
  );
};

ContainerBlockEdit.propTypes = propTypes;

const withActiveBreakpoint = withSelect(select => {
  const activeBreakpoint = select('gutenbee-breakpoints').getBreakpoint();

  return {
    activeBreakpoint,
  };
});

const withColumnControls = withDispatch((dispatch, ownProps, registry) => ({
  updateColumns: (previousColumns, newColumns) => {
    const { clientId } = ownProps;
    const { replaceInnerBlocks } = dispatch('core/block-editor');
    const { getBlocks } = registry.select('core/block-editor');

    let innerBlocks = getBlocks(clientId);

    // Redistribute available width for existing inner blocks.
    const isAddingColumn = newColumns > previousColumns;

    if (isAddingColumn) {
      innerBlocks = [
        ...getMappedColumnWidths(innerBlocks),
        ...times(newColumns - previousColumns, () => {
          return createBlock('gutenbee/column');
        }),
      ];
    } else {
      // The removed column will be the last of the inner blocks.
      innerBlocks = dropRight(innerBlocks, previousColumns - newColumns);
      innerBlocks = getMappedColumnWidths(innerBlocks);
    }

    replaceInnerBlocks(clientId, innerBlocks, false);
  },
}));

export default compose(
  withActiveBreakpoint,
  withColumnControls,
)(ContainerBlockEdit);
