import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  InspectorControls,
  RichText,
  PanelColorSettings,
} from 'wp.blockEditor';
import { PanelBody, TextControl, ToggleControl } from 'wp.components';
import classnames from 'classnames';

import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import ButtonStyle from './style';
import MarginControls from '../../components/controls/margin-controls';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import BorderControls from '../../components/controls/border-controls';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
};

const NEW_TAB_REL = 'noreferrer noopener';

const ButtonEdit = ({ attributes, setAttributes, className, clientId }) => {
  const {
    uniqueId,
    url,
    text,
    rel,
    linkTarget,
    textColor,
    backgroundColor,
  } = attributes;

  useUniqueId({
    attributes,
    setAttributes,
    clientId,
  });

  const blockId = getBlockId(uniqueId);

  const onSetLinkRel = value => {
    setAttributes({ rel: value });
  };

  const onToggleOpenInNewTab = value => {
    const newLinkTarget = value ? '_blank' : undefined;

    let updatedRel = rel;
    if (newLinkTarget && !rel) {
      updatedRel = NEW_TAB_REL;
    } else if (!newLinkTarget && rel === NEW_TAB_REL) {
      updatedRel = undefined;
    }

    setAttributes({
      linkTarget: newLinkTarget,
      rel: updatedRel,
    });
  };

  return (
    <Fragment>
      <div id={blockId} className={className}>
        <ButtonStyle attributes={attributes} />
        <RichText
          placeholder={__('Add text…')}
          value={text}
          onChange={value => setAttributes({ text: value })}
          withoutInteractiveFormatting
          className={classnames({
            'gutenbee-block-button-link': true,
          })}
          style={{
            backgroundColor: backgroundColor || undefined,
            color: textColor || undefined,
            ...getBorderCSSValue({ attributes, prefix: '' }),
          }}
        />
      </div>

      <InspectorControls>
        <PanelBody title={__('Button Settings')} initialOpen>
          <TextControl
            label={__('Button URL')}
            value={url}
            onChange={value => setAttributes({ url: value })}
            type="url"
            placeholder="https://"
          />
          <ToggleControl
            label={__('Open in new tab')}
            onChange={onToggleOpenInNewTab}
            checked={linkTarget === '_blank'}
          />
          <TextControl
            label={__('Link rel')}
            value={rel || ''}
            onChange={onSetLinkRel}
          />
        </PanelBody>

        <PanelColorSettings
          title={__('Block Appearance')}
          initialOpen={false}
          colorSettings={[
            {
              value: textColor,
              onChange: value => setAttributes({ textColor: value }),
              label: __('Text Color'),
            },
            {
              value: backgroundColor,
              onChange: value => setAttributes({ backgroundColor: value }),
              label: __('Background Color'),
            },
          ]}
          onChange={value => setAttributes({ backgroundColor: value })}
        >
          <BorderControls
            attributes={attributes}
            setAttributes={setAttributes}
            attributePrefix=""
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
        </PanelColorSettings>
      </InspectorControls>
    </Fragment>
  );
};

ButtonEdit.propTypes = propTypes;

export default ButtonEdit;
