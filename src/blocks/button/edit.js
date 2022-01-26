import { Fragment, useRef } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { InspectorControls, RichText } from 'wp.blockEditor';
import {
  PanelBody,
  TextControl,
  ToggleControl,
  SelectControl,
} from 'wp.components';
import classNames from 'classnames';

import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import ButtonStyle from './style';
import MarginControls from '../../components/controls/margin-controls';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import BorderControls from '../../components/controls/border-controls';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';
import FontSizePickerLabel from '../../components/controls/text-controls/FontSizePickerLabel';
import { buttonSizeTemplates, buttonStyleTemplates } from './templates';
import URLPicker, { canUseURLPicker } from '../../components/url-picker';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
};

const NEW_TAB_REL = 'noopener';

const ButtonEdit = ({
  attributes,
  setAttributes,
  className,
  clientId,
  isSelected,
}) => {
  const {
    uniqueId,
    url,
    text,
    rel,
    linkTarget,
    fontSize,
    textColor,
    backgroundColor,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  const ref = useRef();

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

  const canUseURLPickerBool = canUseURLPicker();

  return (
    <Fragment>
      <div id={blockId} className={classNames(className, blockId)} ref={ref}>
        <ButtonStyle attributes={attributes} />
        <RichText
          placeholder={__('Add text…')}
          value={text}
          onChange={value => setAttributes({ text: value })}
          withoutInteractiveFormatting
          className={classNames({
            'gutenbee-block-button-link': true,
          })}
          style={{
            backgroundColor: backgroundColor || undefined,
            color: textColor || undefined,
            ...getBorderCSSValue({ attributes, prefix: '' }),
            ...getBoxShadowCSSValue({ attributes, prefix: '' }),
          }}
        />
      </div>

      {canUseURLPickerBool && (
        <URLPicker
          isSelected={isSelected}
          onChange={values => {
            const newLinkTarget = values.opensInNewTab ? '_blank' : undefined;
            let updatedRel = rel;
            if (newLinkTarget && !rel) {
              updatedRel = NEW_TAB_REL;
            } else if (!newLinkTarget && rel === NEW_TAB_REL) {
              updatedRel = undefined;
            }

            setAttributes({
              url: values.url,
              linkTarget: newLinkTarget,
              rel: updatedRel,
            });
          }}
          url={url}
          opensInNewTab={linkTarget === '_blank'}
          anchorRef={ref}
        />
      )}

      <InspectorControls>
        {!canUseURLPickerBool && (
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
        )}

        <PanelBody
          title={__('Block Appearance')}
          initialOpen={canUseURLPickerBool}
        >
          <ResponsiveControl>
            {breakpoint => (
              <FontSizePickerLabel
                label={__('Button Font Size')}
                value={fontSize[breakpoint]}
                onChange={value => {
                  setAttributes({
                    fontSize: {
                      ...fontSize,
                      [breakpoint]: value != null ? value : '',
                    },
                  });
                }}
              />
            )}
          </ResponsiveControl>
          <PopoverColorControl
            label={__('Text Color')}
            value={textColor || ''}
            defaultValue={textColor || ''}
            onChange={value => setAttributes({ textColor: value })}
          />

          <PopoverColorControl
            label={__('Background Color')}
            value={backgroundColor || ''}
            defaultValue={backgroundColor || ''}
            onChange={value => setAttributes({ backgroundColor: value })}
          />

          <BorderControls
            attributes={attributes}
            setAttributes={setAttributes}
            attributePrefix=""
          />

          <BoxShadowControls
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
        </PanelBody>

        <PanelBody title={__('Predefined Templates')} initialOpen={false}>
          <SelectControl
            label={__('Button Size')}
            onChange={value => {
              if (!value) {
                return;
              }

              const values = JSON.parse(value);

              Object.keys(values).forEach(key => {
                setAttributes({
                  [key]: values[key],
                });
              });
            }}
            options={[
              {
                value: '',
                label: '',
              },
              ...buttonSizeTemplates.map(sizeTemplate => ({
                value: JSON.stringify(sizeTemplate.attributes),
                label: sizeTemplate.name,
              })),
            ]}
          />

          <SelectControl
            label={__('Button Style')}
            onChange={value => {
              if (!value) {
                return;
              }

              const values = JSON.parse(value);

              Object.keys(values).forEach(key => {
                setAttributes({
                  [key]: values[key],
                });
              });
            }}
            options={[
              {
                value: '',
                label: '',
              },
              ...buttonStyleTemplates.map(sizeTemplate => ({
                value: JSON.stringify(sizeTemplate.attributes),
                label: sizeTemplate.name,
              })),
            ]}
          />
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

ButtonEdit.propTypes = propTypes;

export default ButtonEdit;
