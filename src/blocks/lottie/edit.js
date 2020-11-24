import { __ } from 'wp.i18n';
import { Fragment, useState } from 'wp.element';
import PropTypes from 'prop-types';
import { InspectorControls } from 'wp.blockEditor';
import {
  RangeControl,
  SelectControl,
  CheckboxControl,
  PanelBody,
  Button,
  Toolbar,
} from 'wp.components';
import {
  MediaUploadCheck,
  BlockControls,
  MediaPlaceholder,
} from 'wp.blockEditor';
import '@lottiefiles/lottie-player';
import classNames from 'classnames';

import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import BorderControls from '../../components/controls/border-controls';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import LottieStyle from './style';
import MarginControls from '../../components/controls/margin-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const LottieEdit = ({ attributes, setAttributes, clientId, className }) => {
  const {
    uniqueId,
    backgroundColor,
    src,
    playMode,
    direction,
    animationSpeed,
    controls,
    autoplay,
    hover,
    loop,
  } = attributes;

  const [editing, setEditing] = useState(!src);
  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  const config = {
    autoplay: autoplay || undefined,
    controls: controls || undefined,
    mode: playMode,
    speed: animationSpeed,
    loop: loop || undefined,
    background: backgroundColor || undefined,
    hover: hover || undefined,
    direction,
    src,
  };

  return (
    <Fragment>
      {editing ? (
        <MediaUploadCheck>
          <MediaPlaceholder
            multiple={false}
            onSelect={file => {
              setAttributes({ src: file.url });
              setEditing(false);
            }}
            allowedTypes={['application/json']}
            render={({ open }) => (
              <Button isSecondary isLarge onClick={open}>
                {__('Select file')}
              </Button>
            )}
            labels={{
              instructions: __(
                'Upload a Lottie JSON file, or pick one from your media library.',
              ),
              title: __('Select a Lottie animation'),
            }}
          />
        </MediaUploadCheck>
      ) : (
        <div
          id={blockId}
          className={classNames(className, blockId)}
          style={{
            ...getBorderCSSValue({ attributes }),
            ...getBoxShadowCSSValue({ attributes }),
          }}
        >
          <LottieStyle attributes={attributes} />
          <lottie-player {...config} key={Object.values(config).join('-')} />
        </div>
      )}

      <BlockControls>
        <Toolbar>
          <Button
            className="components-icon-button components-toolbar__control"
            label={__('Edit animation')}
            onClick={() => setEditing(prevEditing => !prevEditing)}
            icon="edit"
          />
        </Toolbar>
      </BlockControls>

      <InspectorControls>
        <PanelBody title={__('Player Settings')} initialOpen>
          <SelectControl
            label={__('Play Mode')}
            value={playMode}
            options={[
              { value: 'normal', label: __('Normal') },
              { value: 'bounce', label: __('Bounce') },
            ]}
            onChange={value =>
              setAttributes({
                playMode: value,
              })
            }
          />
          <SelectControl
            label={__('Direction')}
            value={direction}
            options={[
              { value: 'forward', label: __('Forward') },
              { value: 'backward', label: __('Backward') },
            ]}
            onChange={value =>
              setAttributes({
                direction: value,
              })
            }
          />
          <RangeControl
            label={__('Animation Speed')}
            min={1}
            max={20}
            value={animationSpeed}
            onChange={value => setAttributes({ animationSpeed: value })}
          />
          <CheckboxControl
            label={__('Show Controls')}
            value="on"
            checked={controls}
            onChange={value => setAttributes({ controls: value })}
          />
          <CheckboxControl
            label={__('Autoplay')}
            value="on"
            checked={autoplay}
            onChange={value => setAttributes({ autoplay: value })}
          />
          <CheckboxControl
            label={__('Play on Hover')}
            value="on"
            checked={hover}
            onChange={value => setAttributes({ hover: value })}
          />
          <CheckboxControl
            label={__('Loop')}
            value="on"
            checked={loop}
            onChange={value => setAttributes({ loop: value })}
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
      </InspectorControls>
    </Fragment>
  );
};

LottieEdit.propTypes = propTypes;

export default LottieEdit;
