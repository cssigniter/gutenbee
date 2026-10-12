import { Fragment, useRef } from 'wp.element';
import { __ } from 'wp.i18n';
import { RichText, InspectorControls, useBlockProps } from 'wp.blockEditor';
import { PanelBody, TextControl, ToggleControl } from 'wp.components';
import classNames from 'classnames';

import Icon from './Icon';
import IconSelect from '../../../components/controls/icon-select';
import URLPicker, { canUseURLPicker } from '../../../components/url-picker';

const IconListItemEdit = ({
  attributes,
  className,
  setAttributes,
  onReplace,
  isSelected,
}) => {
  const { content, icon, listUrl, newTab } = attributes;
  const ref = useRef();

  const listItem = (
    <Fragment>
      <Icon className={className} {...attributes} />
      <RichText
        identifier="content"
        tagName="div"
        className={classNames(
          'wp-block-gutenbee-icon-list-item-text',
          className,
        )}
        value={content}
        aria-label={__('Icon List Item block', 'gutenbee')}
        placeholder={__('Start writing…', 'gutenbee')}
        disableLineBreaks
        onChange={content => setAttributes({ content })}
        onReplace={onReplace}
        onFocus={() => {
          if (content.length === 0) {
            setAttributes({ content: __('Start writing…', 'gutenbee') });
            setTimeout(() => {
              setAttributes({ content: '' });
            }, 0);
          }
        }}
      />
    </Fragment>
  );

  const canUseURLPickerBool = canUseURLPicker();

  const blockProps = useBlockProps({
    className: classNames({
      'wp-block-gutenbee-icon-list-item': true,
    }),
    ref,
  });

  return (
    <Fragment>
      <li {...blockProps}>
        {listUrl ? (
          <span className="wp-block-gutenbee-list-icon-pseudo-link">
            {listItem}
          </span>
        ) : (
          listItem
        )}
      </li>

      {canUseURLPickerBool && (
        <URLPicker
          isSelected={isSelected}
          onChange={values => {
            setAttributes({
              listUrl: values.url,
              newTab: values.opensInNewTab,
            });
          }}
          url={listUrl}
          opensInNewTab={newTab}
          anchorRef={ref}
        />
      )}

      <InspectorControls>
        <PanelBody>
          <IconSelect
            value={icon}
            onChange={value => setAttributes({ icon: value })}
            label={__('List Item Icon', 'gutenbee')}
          />

          {!canUseURLPickerBool && (
            <Fragment>
              <TextControl
                label={__('List Item URL', 'gutenbee')}
                value={listUrl}
                onChange={value => setAttributes({ listUrl: value })}
                type="url"
                placeholder="https://"
                __nextHasNoMarginBottom
                __next40pxDefaultSize
              />
              <ToggleControl
                label={__('Open in new tab', 'gutenbee')}
                checked={!!newTab}
                onChange={() => setAttributes({ newTab: !newTab })}
                help={
                  newTab
                    ? __('Opens link in new tab.', 'gutenbee')
                    : __('Toggle to open link in new tab.', 'gutenbee')
                }
                __nextHasNoMarginBottom
              />
            </Fragment>
          )}
        </PanelBody>
      </InspectorControls>
    </Fragment>
  );
};

export default IconListItemEdit;
